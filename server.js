// Production Node.js Server for Render Deployment
// Features: Static SPA Serving, REST Persistence API, and RFC 6455 Real-Time WebSockets

import http from 'http';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DIST_DIR = path.join(__dirname, 'dist');

// Ensure persistent data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const MEDIA_FILE = path.join(DATA_DIR, 'media.json');
const COLLECTIONS_FILE = path.join(DATA_DIR, 'collections.json');
const WATCHROOMS_FILE = path.join(DATA_DIR, 'watchrooms.json');

// Helper to read JSON data safely
function readJson(filePath, defaultVal = []) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return defaultVal;
}

// Helper to write JSON data safely
function writeJson(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
}

// MIME types dictionary
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.mp3': 'audio/mpeg',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
};

// Connected WebSocket Clients
const wsClients = new Set();

// Send parsed body helper
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 5 * 1024 * 1024) {
        // Limit to 5MB
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

// HTTP Server
const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // Set Production Security & CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // 1. Healthcheck for Render Monitoring
  if (pathname === '/api/health' || pathname === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'Aether Sitewide Google Drive Manager',
        activeClients: wsClients.size,
        uptime: process.uptime(),
      })
    );
    return;
  }

  // 2. Google OAuth Configuration Endpoint
  if (pathname === '/api/oauth/google/config') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        clientId: process.env.GOOGLE_CLIENT_ID || 'demo-client-id.apps.googleusercontent.com',
        redirectUri: process.env.APP_URL
          ? `${process.env.APP_URL}/oauth/callback`
          : `http://localhost:${PORT}/oauth/callback`,
        authorizedOrigin: process.env.APP_URL || `http://localhost:${PORT}`,
      })
    );
    return;
  }

  // 3. Media Items REST API
  if (pathname === '/api/media') {
    if (req.method === 'GET') {
      const items = readJson(MEDIA_FILE, []);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(items));
      return;
    }

    if (req.method === 'POST') {
      try {
        const body = await parseBody(req);
        const existing = readJson(MEDIA_FILE, []);
        const toAdd = Array.isArray(body) ? body : [body];
        const updated = [...toAdd, ...existing];
        writeJson(MEDIA_FILE, updated);

        // Broadcast to WebSocket clients
        broadcastWs({ type: 'media:added', payload: toAdd });

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, count: toAdd.length }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }
  }

  // 4. Single Media Item Endpoint (PUT / DELETE)
  if (pathname.startsWith('/api/media/')) {
    const id = pathname.replace('/api/media/', '');
    let existing = readJson(MEDIA_FILE, []);

    if (req.method === 'DELETE') {
      existing = existing.filter((m) => m.id !== id);
      writeJson(MEDIA_FILE, existing);
      broadcastWs({ type: 'media:deleted', payload: { id } });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, id }));
      return;
    }

    if (req.method === 'PUT') {
      const updates = await parseBody(req);
      existing = existing.map((m) => (m.id === id ? { ...m, ...updates, updatedAt: Date.now() } : m));
      writeJson(MEDIA_FILE, existing);
      broadcastWs({ type: 'media:updated', payload: { id, updates } });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
      return;
    }
  }

  // 5. Collections Endpoint
  if (pathname === '/api/collections') {
    if (req.method === 'GET') {
      const cols = readJson(COLLECTIONS_FILE, []);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(cols));
      return;
    }

    if (req.method === 'POST') {
      const newCol = await parseBody(req);
      const cols = readJson(COLLECTIONS_FILE, []);
      cols.unshift(newCol);
      writeJson(COLLECTIONS_FILE, cols);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newCol));
      return;
    }
  }

  // 6. Watch Rooms Endpoint
  if (pathname === '/api/watchrooms') {
    if (req.method === 'GET') {
      const rooms = readJson(WATCHROOMS_FILE, []);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(rooms));
      return;
    }

    if (req.method === 'POST') {
      const room = await parseBody(req);
      const rooms = readJson(WATCHROOMS_FILE, []);
      rooms.unshift(room);
      writeJson(WATCHROOMS_FILE, rooms);
      broadcastWs({ type: 'watchroom:created', payload: room });
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(room));
      return;
    }
  }

  // 7. Static File Serving from ./dist
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(DIST_DIR, safePath);

  // If path is root or directory without extension, check if file exists, else fallback to index.html
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      filePath = path.join(DIST_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }

      // Cache control: Static hashed assets cached for 1 year, index.html not cached
      if (ext === '.html') {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      } else {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

// RFC 6455 WebSocket Implementation (Zero Dependencies)
server.on('upgrade', (req, socket, head) => {
  const key = req.headers['sec-websocket-key'];
  if (!key) {
    socket.destroy();
    return;
  }

  // Compute accept hash
  const GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
  const acceptKey = crypto
    .createHash('sha1')
    .update(key + GUID)
    .digest('base64');

  const responseHeaders = [
    'HTTP/1.1 101 Switching Protocols',
    'Upgrade: websocket',
    'Connection: Upgrade',
    `Sec-WebSocket-Accept: ${acceptKey}`,
  ];

  socket.write(responseHeaders.join('\r\n') + '\r\n\r\n');
  wsClients.add(socket);

  socket.on('data', (buffer) => {
    try {
      const message = decodeWebSocketFrame(buffer);
      if (message) {
        handleWsMessage(socket, message);
      }
    } catch {}
  });

  socket.on('close', () => {
    wsClients.delete(socket);
  });

  socket.on('error', () => {
    wsClients.delete(socket);
  });
});

// Decode masked client frame
function decodeWebSocketFrame(buffer) {
  if (buffer.length < 2) return null;
  const secondByte = buffer[1];
  const isMasked = (secondByte & 0x80) === 0x80;
  let payloadLength = secondByte & 0x7f;
  let offset = 2;

  if (payloadLength === 126) {
    payloadLength = buffer.readUInt16BE(2);
    offset += 2;
  } else if (payloadLength === 127) {
    // 64-bit int not commonly needed for small JSON messages
    return null;
  }

  let maskingKey = null;
  if (isMasked) {
    maskingKey = buffer.slice(offset, offset + 4);
    offset += 4;
  }

  const payload = buffer.slice(offset, offset + payloadLength);
  if (isMasked && maskingKey) {
    for (let i = 0; i < payload.length; i++) {
      payload[i] ^= maskingKey[i % 4];
    }
  }

  try {
    return JSON.parse(payload.toString('utf-8'));
  } catch {
    return null;
  }
}

// Encode unmasked server frame
function encodeWebSocketFrame(data) {
  const jsonStr = JSON.stringify(data);
  const payload = Buffer.from(jsonStr, 'utf-8');
  const length = payload.length;

  let header;
  if (length <= 125) {
    header = Buffer.from([0x81, length]);
  } else if (length <= 65535) {
    header = Buffer.alloc(4);
    header[0] = 0x81;
    header[1] = 126;
    header.writeUInt16BE(length, 2);
  } else {
    header = Buffer.alloc(10);
    header[0] = 0x81;
    header[1] = 127;
    header.writeBigUInt64BE(BigInt(length), 2);
  }

  return Buffer.concat([header, payload]);
}

// Broadcast to all active clients
function broadcastWs(data, senderSocket = null) {
  const frame = encodeWebSocketFrame(data);
  for (const client of wsClients) {
    if (client !== senderSocket && client.writable) {
      try {
        client.write(frame);
      } catch {
        wsClients.delete(client);
      }
    }
  }
}

// Handle WebSocket incoming messages
function handleWsMessage(socket, msg) {
  if (!msg || !msg.type) return;

  // Handle synchronized watch room playback (play, pause, seek)
  if (msg.type.startsWith('watchroom:')) {
    broadcastWs(msg, socket);
    return;
  }

  // Handle real-time chat messages
  if (msg.type === 'chat:message') {
    broadcastWs(msg, socket);
    return;
  }

  // Handle call signaling (WebRTC offer, answer, ice candidate)
  if (msg.type.startsWith('call:')) {
    broadcastWs(msg, socket);
    return;
  }
}

// Heartbeat ping interval to keep Render connections alive
setInterval(() => {
  const pingFrame = Buffer.from([0x89, 0x00]); // Ping frame opcode 0x9
  for (const client of wsClients) {
    if (client.writable) {
      try {
        client.write(pingFrame);
      } catch {
        wsClients.delete(client);
      }
    }
  }
}, 25000);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(`🚀 Aether Sitewide Google Drive Manager Live Server`);
  console.log(`🌐 Production URL: http://0.0.0.0:${PORT}`);
  console.log(`📦 Serving static build from: ${DIST_DIR}`);
  console.log(`⚡️ RFC 6455 WebSockets Online (Watch Rooms & Sync)`);
  console.log(`🔒 Google OAuth Redirect Configured for Production`);
  console.log(`====================================================`);
});
