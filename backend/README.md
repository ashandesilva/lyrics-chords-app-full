# ⚙️ Spring Boot Backend — Lyrics & Chords App

## 📦 Modules
- **Auth** — JWT-based login & registration
- **Songs & Artists** — CRUD operations
- **Favorites & Playlists** — per-user associations
- **Admin Access** — role-based route protection

## ⚙️ Tech Stack
- **Java 21** (Eclipse Temurin)
- **Spring Boot 3.2** (Web, Security, Data JPA)
- **PostgreSQL 16** — primary database
- **Redis 7** — caching / session support
- **JJWT 0.9.1** — JWT token generation & validation

## 📁 Project Structure
```
backend/
├── src/main/
│   ├── java/com/chordsapp/
│   │   ├── Application.java          # Spring Boot entry point
│   │   ├── CorsConfig.java           # CORS — allows frontend origin
│   │   ├── controller/
│   │   │   └── AuthController.java   # POST /api/auth/register, /api/auth/login
│   │   ├── model/
│   │   │   ├── User.java
│   │   │   ├── Song.java
│   │   │   └── Artist.java
│   │   ├── repository/               # Spring Data JPA repositories
│   │   ├── security/
│   │   │   └── SecurityConfig.java   # JWT filter + route protection
│   │   ├── service/
│   │   │   └── AuthService.java
│   │   └── util/
│   │       └── JwtUtil.java          # Token generation & validation
│   └── resources/
│       └── application.properties    # Config with env-var overrides
├── pom.xml                           # Maven build (Spring Boot 3.2, Java 21)
├── Dockerfile                        # Multi-stage: Maven build → JRE run
└── .dockerignore
```

## 🔐 Auth & JWT
- **Access token expiry:** 15 minutes (`jwt.expirationMs=900000`)
- **Refresh token expiry:** 7 days (`jwt.refreshExpirationMs=604800000`)
- All routes except `/api/auth/**` require a valid `Authorization: Bearer <token>` header

## ▶️ Running Locally (without Docker)

**Prerequisites:** Java 21+, Maven, PostgreSQL 16 running locally, Redis running locally

1. Ensure PostgreSQL has a database named `chordsdb` with user `user` / password `password`
2. Ensure Redis is running on `localhost:6379`
3. Run:

```bash
cd backend
# Linux/macOS:
./mvnw spring-boot:run

# Windows:
.\mvnw.cmd spring-boot:run
```

API available at **http://localhost:8080**

> `application.properties` uses `${ENV_VAR:default}` syntax — no changes needed for local defaults.

## 🐳 Running with Docker

From the project root:
```bash
docker compose up --build
```

PostgreSQL and Redis start automatically as containers. The backend waits for both to be healthy before starting.

## How to Log Into the Database
While the containers are running, you can get a live psql shell with:
```bash
docker exec -it chordsapp-postgres psql -U user -d chordsdb
```
Once inside psql, useful commands:

```sql
-- List all tables
\dt

-- See all users
SELECT id, email, role FROM users;

-- See all songs
SELECT id, title FROM song;

-- See all artists
SELECT id, name FROM artist;

-- Exit
\q
```
You can also connect with a GUI like DBeaver or pgAdmin using:
|Field|Value|
|Host|localhost|
|Port|5432|
|Database|chordsdb|
|Username|user|
|Password|password|


## 👤 Admin User (preloaded)
| Field | Value |
|---|---|
| Email | `admin@chordsapp.com` |
| Password | `admin123` |

## 🌐 API Endpoints
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | None | Register new user |
| `POST` | `/api/auth/login` | None | Login, returns JWT |