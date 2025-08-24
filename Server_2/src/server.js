// server.ts
import http from "http";
import { WebSocketServer, WebSocket } from "ws";
import { randomUUID } from "crypto";
import dotenv from "dotenv";

dotenv.config();

const server = http.createServer();
const wss = new WebSocketServer({ server, path: "/feedback/from-user" });

function connectToAI() {
  return new Promise((resolve, reject) => {
    const ai = new WebSocket(process.env.AI_WSS_URL);
    ai.binaryType = "arraybuffer";
    ai.on("open", () => resolve(ai));
    ai.on("error", reject);
  });
}

wss.on("connection", async (client, req) => {
  const id = randomUUID();
  const conn = { id, client, started: false };

  console.log(`[${id}] client connected from ${req.socket.remoteAddress}`);

  let pingTimer = null;

  const closeAll = (code = 1000, reason = "closing") => {
    try {
      client.readyState === WebSocket.OPEN && client.close(code, reason);
    } catch {}
    try {
      conn.ai &&
        conn.ai.readyState === WebSocket.OPEN &&
        conn.ai.close(code, reason);
    } catch {}
    if (pingTimer) clearInterval(pingTimer);
  };

  client.on("message", async (data, isBinary) => {
    // Control frames (JSON)
    if (!isBinary) {
      try {
        const msg = JSON.parse(data.toString());
        if (msg.type === "start" && !conn.started) {
          conn.started = true;
          conn.codec = msg.codec;
          conn.container = msg.container;
          conn.sampleRate = msg.sampleRate ?? 48000;
          conn.channels = msg.channels ?? 1;

          // Dial AI server once we know format
          conn.ai = await connectToAI();

          // Tell AI about the incoming format
          conn.ai.send(
            JSON.stringify({
              type: "start",
              codec: conn.codec,
              container: conn.container,
              sampleRate: conn.sampleRate,
              channels: conn.channels,
              sessionId: conn.id,
            })
          );

          // AI → Client audio/controls
          conn.ai.on("message", (aiData, aiIsBinary) => {
            if (aiIsBinary) {
              // Backpressure: if client buffer too big, drop or queue
              if (client.readyState === WebSocket.OPEN) {
                if (client.bufferedAmount < 1_000_000) {
                  client.send(aiData, { binary: true }, () => {});
                }
              }
            } else {
              // Forward control frames
              if (client.readyState === WebSocket.OPEN)
                client.send(aiData.toString());
            }
          });

          conn.ai.on("close", () => closeAll(1011, "ai_closed"));
          conn.ai.on("error", () => closeAll(1011, "ai_error"));

          client.send(JSON.stringify({ type: "ready" }));

          // heartbeats
          pingTimer = setInterval(() => {
            if (client.readyState === WebSocket.OPEN) client.ping();
            if (conn.ai && conn.ai.readyState === WebSocket.OPEN)
              conn.ai.ping?.();
          }, 15000);
        } else if (msg.type === "end") {
          conn.ai?.send(JSON.stringify({ type: "end", reason: "client_end" }));
          closeAll(1000, "client_end");
        } else {
          // Pass any other control to AI
          conn.ai?.send(JSON.stringify(msg));
        }
      } catch (e) {
        console.error(`[${id}] bad JSON`, e);
      }
      return;
    }

    // Binary audio from client -> AI
    if (conn.ai && conn.ai.readyState === WebSocket.OPEN) {
      // Apply backpressure: if AI socket is backed up, drop or throttle
      if (conn.ai.bufferedAmount < 1_000_000) {
        conn.ai.send(data, { binary: true });
      }
    }
  });

  client.on("close", () => closeAll(1000, "client_closed"));
  client.on("error", () => closeAll(1011, "client_error"));
});

server.listen(process.env.SOCKETPORT ?? 8080, () => {
  console.log(`WS relay listening on :${process.env.SOCKETPORT ?? 8080}`);
});
