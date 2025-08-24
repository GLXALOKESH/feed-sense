import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';
import pdf from 'pdf-parse';
import JSON5 from "json5";





function safeJsonParseFromGemini(response) {
  try {
    const match = response.match(/```json\s*([\s\S]*?)```/);
    const jsonString = match ? match[1] : response;
    return JSON5.parse(jsonString);
  } catch (err) {
    console.error("JSON parse failed:", err.message);
    return null;
  }
}

export { safeJsonParseFromGemini};