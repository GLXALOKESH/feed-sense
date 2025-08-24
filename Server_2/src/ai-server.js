// ai-server.js
import { WebSocketServer } from 'ws';

import http from 'http';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.AI_SERVER_PORT ? Number(process.env.AI_SERVER_PORT) : 8090;
const PATH = '/ai-server/feedback';

const server = http.createServer();
const wss = new WebSocketServer({ server, path: PATH });

server.listen(PORT, () => {
  console.log(`AI server listening on ws://localhost:${PORT}${PATH}`);
});

wss.on('connection', (ws) => {
  console.log('AI server: client connected');

  ws.on('message', (data, isBinary) => {
    if (isBinary) {
      console.log('AI server: received audio data, length:', data.length);
      ws.send(JSON.stringify({ type: 'audio_received' }));
    } else {
      try {
        const msg = JSON.parse(data.toString());
        console.log('AI server: received control message', msg);
      } catch (e) {
        console.log('AI server: received non-JSON message: ', e.toString());
      }
    }
  });

  ws.on('close', () => {
    console.log('AI server: client disconnected');
  });
});

