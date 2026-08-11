# Development Guide — YourSneaker

## Prerequisites
- **.NET 8 SDK** — [Download](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Node.js 20+** — [Download](https://nodejs.org/)
- **Docker Desktop** — [Download](https://www.docker.com/products/docker-desktop/)
- **Git** — [Download](https://git-scm.com/)
- **IDE**: Visual Studio 2022 / VS Code / JetBrains Rider

## Initial Setup

### 1. Start MySQL (Docker)
```bash
cd YourSneaker
docker-compose up -d
```
MySQL sẽ chạy ở `localhost:3306` với:
- Database: `yoursneaker_db`
- User: `root`
- Password: `YourSneaker@2024`

Kiểm tra container:
```bash
docker ps
docker logs yoursneaker-mysql
```

### 2. Backend Setup
```bash
cd server

# Restore NuGet packages
dotnet restore

# Áp dụng migrations
cd src/YourSneaker.Api
dotnet ef database update --project ../../src/YourSneaker.Infrastructure

# Chạy dev server
dotnet run
# hoặc hot-reload
dotnet watch run
```
Backend: `https://localhost:5001` | Swagger: `https://localhost:5001/swagger`

### 3. Frontend Setup
```bash
cd client

# Install dependencies
npm install

# Chạy dev server
npm run dev
```
Frontend: `http://localhost:5173`

## Environment Variables

### Backend (`appsettings.Development.json`)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Port=3306;Database=yoursneaker_db;User=root;Password=YourSneaker@2024;"
  },
  "Jwt": {
    "Secret": "your-256-bit-secret-key-here-min-32-chars",
    "Issuer": "YourSneaker",
    "Audience": "YourSneaker",
    "AccessTokenExpirationMinutes": 30,
    "RefreshTokenExpirationDays": 7
  },
  "Cors": {
    "AllowedOrigins": ["http://localhost:5173"]
  }
}
```

### Frontend (`.env`)
```
VITE_API_URL=https://localhost:5001/api/v1
```

## Common Commands

### Backend
```bash
# Tạo migration mới
dotnet ef migrations add <MigrationName> --project src/YourSneaker.Infrastructure --startup-project src/YourSneaker.Api

# Áp dụng migration
dotnet ef database update --project src/YourSneaker.Infrastructure --startup-project src/YourSneaker.Api

# Rollback migration
dotnet ef database update <PreviousMigrationName> --project src/YourSneaker.Infrastructure --startup-project src/YourSneaker.Api

# Run tests
dotnet test

# Build production
dotnet publish -c Release
```

### Frontend
```bash
npm run dev        # Dev server
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # Lint check
npm run type-check # TypeScript check
```

### Docker
```bash
docker-compose up -d       # Start MySQL
docker-compose down        # Stop MySQL
docker-compose down -v     # Stop + remove volumes (reset data!)
docker exec -it yoursneaker-mysql mysql -uroot -p  # MySQL CLI
```

## Git Workflow
```bash
git checkout -b feature/auth-login
# ... code ...
git add .
git commit -m "feat: implement login endpoint with JWT"
git push origin feature/auth-login
# Create PR → merge to main
```

## Troubleshooting

### MySQL connection refused
- Kiểm tra Docker container đang chạy: `docker ps`
- Kiểm tra port 3306 không bị chiếm: `netstat -ano | findstr 3306`

### EF Core migration errors
- Đảm bảo MySQL container đang chạy
- Kiểm tra connection string trong appsettings
- Thử xóa và tạo lại database: `dotnet ef database drop` rồi `dotnet ef database update`

### CORS errors trên frontend
- Kiểm tra `AllowedOrigins` trong appsettings có đúng URL frontend
- Đảm bảo middleware CORS được đăng ký trước Authorization trong Program.cs
