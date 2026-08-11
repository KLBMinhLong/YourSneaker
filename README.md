# 👟 YourSneaker — Premium Sneaker E-Commerce

**Full-stack e-commerce platform** | ASP.NET Core 8 • React + TypeScript • MySQL • Docker

## Tech Stack

| Layer        | Technology                                                     |
|--------------|----------------------------------------------------------------|
| **Frontend** | React 18, Vite, TypeScript, TanStack Query, Zustand            |
| **Backend**  | ASP.NET Core 8 Web API, Clean Architecture, EF Core 8          |
| **Database** | MySQL 8.0 (Docker)                                             |
| **Auth**     | JWT + Refresh Token                                             |

## Quick Start

```bash
# 1. Start MySQL
docker-compose up -d

# 2. Backend
cd server/src/YourSneaker.Api
dotnet restore && dotnet ef database update && dotnet run

# 3. Frontend
cd client && npm install && npm run dev
```

## Docs
- [Architecture](./docs/architecture.md)
- [API Spec](./docs/api-spec.md)
- [Database Schema](./docs/database-schema.md)
- [Development Guide](./docs/development-guide.md)
- [Project Phases](./docs/project-phases.md)
- [Design System](./DESIGN.md)
