# 🎸 Lyrics & Chords App

A fullstack web application for browsing, favoriting, and organizing song lyrics and guitar chords.  
Built with a **Spring Boot** REST API backend and a **React + Vite** frontend, orchestrated via **Docker Compose**.

---

## 🚀 Features
- 🔐 JWT Authentication (login & registration)
- 🎵 Song & Artist browsing with lyrics/chords
- ❤️ Favorites & Playlists per user
- 🛡️ Admin Panel (add/edit songs & artists)
- 📜 Auto-scroll Lyrics View

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 5, TailwindCSS 3, Axios, React Router v6 |
| Backend | Java 21, Spring Boot 3.2, Spring Security, Spring Data JPA |
| Database | PostgreSQL 16 |
| Cache | Redis 7 |
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
   ./mvnw spring-boot:run        # Linux/macOS
   .\mvnw.cmd spring-boot:run    # Windows
   ```
4. Run frontend:
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
| `POST` | `/api/auth/register` | No | Create new account |
| `POST` | `/api/auth/login` | No | Login, returns JWT |
| All others | `/api/**` | Yes (`Bearer <token>`) | Protected routes |