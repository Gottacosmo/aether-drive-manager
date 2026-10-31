# 🚀 Render Production Deployment Guide: Sitewide Google Drive Link Manager

This document provides step-by-step instructions for deploying the **Sitewide Google Drive Link Manager** to [Render](https://render.com).

---

## 📋 Architecture & Deployment Specs

| Service Component | Configuration |
|---|---|
| **Service Type** | Web Service (Node.js) |
| **Node Version** | `20.x` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `node server.js` |
| **Health Check Path** | `/api/health` |
| **Real-Time Protocol** | Native RFC 6455 WebSockets on unified HTTP port |
| **Persistence** | File-backed JSON (`data/media.json`, `data/collections.json`, `data/watchrooms.json`) |
| **Default Production URL** | `https://aether-drive-manager.onrender.com` |

---

## 🛠️ Step 1: Push Repository to GitHub or GitLab

1. If you haven't created a GitHub repository yet, create a new repo on GitHub:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/aether-drive-manager.git
   git push -u origin main
   ```

---

## 🌐 Step 2: One-Click Deploy with Render Blueprint (`render.yaml`)

The repository includes a ready-to-use `render.yaml` blueprint.

1. Log in to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** → **Blueprint**.
3. Select your repository: `aether-drive-manager`.
4. Render will read `render.yaml` and configure:
   - **Name**: `aether-drive-manager`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node server.js`
   - **Healthcheck Path**: `/api/health`
5. Click **Apply**. Render will automatically build the frontend assets, start the WebSocket backend, and deploy your live production URL.

---

## 🔑 Step 3: Configure Production Environment Variables

Under **Settings** → **Environment** in your Render service dashboard, add:

| Key | Example Value | Description |
|---|---|---|
| `PORT` | `10000` | Render internal web port (auto-bound by Render) |
| `NODE_VERSION` | `20.x` | Recommended Node.js LTS engine |
| `APP_URL` | `https://aether-drive-manager.onrender.com` | Production canonical URL |
| `GOOGLE_CLIENT_ID` | `your-client-id.apps.googleusercontent.com` | Google OAuth Web Client ID |
| `GOOGLE_CLIENT_SECRET` | `your-google-oauth-secret` | Google OAuth Secret (Encrypted) |

---

## 🔒 Step 4: Configure Google OAuth Credentials for Production

To support Google Drive authentication and single sign-on with Google:

1. Open the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Under **APIs & Services** → **Credentials**, click your **OAuth 2.0 Client ID** (Web application).
3. Under **Authorized JavaScript origins**, add:
   ```
   https://aether-drive-manager.onrender.com
   ```
4. Under **Authorized redirect URIs**, add:
   ```
   https://aether-drive-manager.onrender.com/oauth/callback
   ```
5. Click **Save**.

---

## 📡 Step 5: WebSockets & Real-Time Sync Verification

Render supports WebSockets natively on all web service plans without any extra configuration.

- **Watch Rooms Sync**: Video play, pause, and seek events are broadcast to all participants in real time.
- **Heartbeat**: The server sends a WebSocket ping frame every 25 seconds to keep the connection alive through Render's reverse proxy.
- **Healthcheck**: Render's health monitor monitors `/api/health` and will automatically restart the instance if unhealthy.

---

## 🧪 Production Verification Checklist

- [x] **Global Upload Menu**: Persistent `+` button in navigation sidebar opens "Add Media" modal.
- [x] **Multi-link Support**: Paste multiple links (movies, music, books, docs, images).
- [x] **Automatic Detection**: File types auto-categorized with previews.
- [x] **Collections & Categories**: Organized into Watch, Music, Reading, Documents, Galleries, and Shared Libraries.
- [x] **Sitewide Embedding**:
  - [x] Chat messages (`MessageComposer` & `MessageBubble`)
  - [x] Friend profiles & Group conversations (`DetailSidebar`)
  - [x] Watch rooms (`WatchRoomModal` with synchronized playback)
  - [x] Persistent music player bar (`PersistentAudioPlayerBar`)
  - [x] Embedded PDF book reader (`BookReaderModal`)
  - [x] Fullscreen image lightbox (`ImageLightboxModal`)
  - [x] Community social posts (`SocialFeedView`)
- [x] **Permissions & Sharing**: Internal share links, visibility toggles, and strict adherence to Google Drive access controls.
- [x] **Universal Media Recognition**: Auto-detects pasted Google Drive links in any chat or post input with instant embed prompts.
