# 🎸 Lyrics & Chords App

A fullstack web application for browsing, favoriting, and organizing song lyrics and guitar chords.  
Built with a **Spring Boot** REST API backend and a **React + Vite** frontend, orchestrated via **Docker Compose**.

---

## 🚀 Features
- 🔐 JWT Authentication (login & registration)
- 🎵 Song browsing with chords (loaded from PostgreSQL via REST API)
- 📜 Full lyrics for signed-in users
- 🛡️ Admin user seeded on first run
- ❤️ Favorites & Playlists *(data model ready; API coming soon)*
- 📜 Auto-scroll Lyrics View *(planned)*

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 5, TailwindCSS 3, Axios, React Router v6 |
| Backend | Java 21, Spring Boot 3.2, Spring Security, Spring Data JPA |
| Database | PostgreSQL 16 |
| Cache | Redis 7 *(included in Docker; reserved for future caching)* |
| Auth | JWT (JJWT 0.9.1) |
| DevOps | Docker, Docker Compose, Nginx |

---

## 📁 Project Structure

```
lyrics-chords-app-full/
├── docker-compose.yml          # Orchestrates all 4 services
├── backend/
│   ├── pom.xml                 # Maven build file
│   ├── Dockerfile
│   └── src/main/
│       ├── java/com/chordsapp/ # Spring Boot application code
│       └── resources/
│           └── application.properties
└── frontend/
    ├── package.json
    ├── Dockerfile
    ├── nginx.conf              # Serves SPA + proxies /api/ to backend
    └── src/
        ├── api/client.js       # Axios instance with JWT interceptor
        ├── App.jsx
        ├── main.jsx
        └── pages/
```

---

## 🧪 Local Development — Docker (Recommended)

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and **running**

### 1. Clone the project
```bash
git clone <this-repo>
cd lyrics-chords-app-full
```

### 2. Start all services
```bash
docker compose up --build
```

> ⏱️ First build takes ~5–8 minutes (downloads Maven deps + npm packages). Subsequent builds are fast.

The frontend waits for the backend health check (`GET /api/health`) before starting.

### 3. Access the app

| Service | URL |
|---|---|
| 🌐 Frontend | http://localhost:3000 |
| ⚙️ Backend API | http://localhost:8080 |
| 🗄️ PostgreSQL | localhost:5432 |
| 🔴 Redis | localhost:6379 |

### 4. Stop
```bash
docker compose down          # stop containers
docker compose down -v       # stop + delete database volume (fresh start)
```

---

## 🧪 Local Development — Without Docker

**Requirements:** Java 21+, Maven, Node.js 18+, PostgreSQL 16, Redis 7

1. Start PostgreSQL with DB `chordsdb`, user `user`, password `password`
2. Start Redis on `localhost:6379`
3. Run backend:
   ```bash
   cd backend
   mvn spring-boot:run
   ```
4. Run frontend (Vite proxies `/api` to `http://localhost:8080`):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

> **Windows PowerShell:** If `npm` is blocked, run once:
> ```powershell
> Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
> ```

---

## 👤 Default Admin Login
| Field | Value |
|---|---|
| Email | `admin@chordsapp.com` |
| Password | `admin123` |

---

## 🔌 API Overview

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET` | `/api/health` | No | Health check for Docker / load balancers |
| `POST` | `/api/auth/register` | No | Create new account; returns JWT |
| `POST` | `/api/auth/login` | No | Login; returns JWT |
| `GET` | `/api/songs` | No | List songs (optional `?search=` query) |
| `GET` | `/api/songs/{id}` | Yes (`Bearer <token>`) | Full song with lyrics |

Error responses return JSON: `{ "message": "..." }` with an appropriate HTTP status code.

---

## 🔧 Configuration

Environment variables (set in `docker-compose.yml` or your shell):

| Variable | Default | Description |
|---|---|---|
| `SPRING_DATASOURCE_URL` | `jdbc:postgresql://localhost:5432/chordsdb` | PostgreSQL JDBC URL |
| `JWT_SECRET` | *(see application.properties)* | HS512 signing key — **must be ≥ 64 characters** |
| `JWT_EXPIRATION_MS` | `900000` | Access token lifetime (15 min) |

---

## 📝 Known Limitations / Roadmap

- Favorites and admin CRUD endpoints are not yet exposed (JPA models exist)
- Redis is wired in Docker but not used by application code yet
- JWT refresh tokens are configured but not implemented
- Consider upgrading JJWT to 0.12.x for Java 21 compatibility long-term
