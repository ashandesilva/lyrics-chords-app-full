# 🎸 React Frontend — Lyrics & Chords App

## 📦 Features
- Auth Pages (Login, Register)
- Song & Artist Browsing
- Playlists and Favorites
- Admin Panel (Add/Edit Songs/Artists)
- Scrollable Lyrics View with Auto-scroll

## ⚙️ Tech Stack
- **React 18** + **Vite 5**
- **TailwindCSS 3** (with PostCSS + Autoprefixer)
- **Axios** — API calls to Spring Boot backend
- **React Router v6** — client-side routing

## 📁 Project Structure
```
frontend/
├── src/
│   ├── pages/         # Route-level page components
│   │   ├── Home.jsx
│   │   └── Login.jsx
│   ├── App.jsx        # Route definitions
│   ├── main.jsx       # React entry point
│   └── index.css      # Tailwind base styles
├── index.html
├── vite.config.js     # Vite config (dev server on port 3000)
├── tailwind.config.js
├── postcss.config.js
├── nginx.conf         # Nginx config used in Docker (proxies /api/ → backend)
├── Dockerfile         # Multi-stage: Node 20 build → nginx serve
└── package.json
```

## ▶️ Running Locally (without Docker)

> **Windows PowerShell note:** If `npm` is blocked, run this once first:
> ```powershell
> Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
> ```

```bash
cd frontend
npm install
npm run dev
```

App will be available at **http://localhost:3000**

Make sure the backend is running at `http://localhost:8080` (or update the API base URL in your Axios config).

## 🐳 Running with Docker

From the project root:
```bash
docker compose up --build
```

Frontend will be served by **nginx on port 3000** → http://localhost:3000  
All `/api/` requests are automatically proxied to the backend container.

## 🔗 API Base URL
Defaults to calling `/api/` (relative) when served through nginx in Docker.  
For local dev without Docker, configure Axios to point to `http://localhost:8080`.