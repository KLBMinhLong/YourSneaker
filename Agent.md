# Agent.md — YourSneaker Project

## Project Overview
**YourSneaker** là một e-commerce platform bán giày sneaker, xây dựng với phong cách **streetwear vibe** (dark theme, bold typography, urban aesthetic). Đây là dự án portfolio phục vụ xin việc, cần thể hiện kỹ năng full-stack ở mức professional.

## Tech Stack

### Backend
- **Runtime**: ASP.NET Core 8 Web API (C#)
- **Architecture**: Clean Architecture (4 layers)
- **ORM**: Entity Framework Core 8 (Code-First, Migrations)
- **Auth**: JWT + Refresh Token, phân quyền Customer / Admin
- **API Docs**: Swagger / Swashbuckle

### Frontend
- **Framework**: React 18 + Vite + TypeScript
- **Routing**: React Router v6
- **Data Fetching**: TanStack Query (React Query) v5
- **State Management**: Zustand (cho cart, auth state)
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Styling**: Vanilla CSS (CSS Modules hoặc global styles, KHÔNG dùng Tailwind)

### Database
- **DBMS**: MySQL 8.0 (chạy trên Docker)
- **Migrations**: EF Core Migrations (Code-First)

### DevOps / Tooling
- **Containerization**: Docker + Docker Compose (chỉ cho MySQL)
- **Version Control**: Git + GitHub
- **Package Manager**: npm (frontend), NuGet (backend)

## Project Structure (Monorepo)
```
YourSneaker/
├── Agent.md                          # File này
├── README.md                         # Project overview
├── DESIGN.md                         # Design system
├── docker-compose.yml                # MySQL container
├── .gitignore
│
├── docs/                             # Documentation
│   ├── architecture.md
│   ├── api-spec.md
│   ├── database-schema.md
│   ├── development-guide.md
│   └── project-phases.md
│
├── server/                           # ASP.NET Core Backend
│   ├── YourSneaker.sln
│   ├── src/
│   │   ├── YourSneaker.Api/          # Presentation layer
│   │   │   ├── Controllers/
│   │   │   ├── Middleware/
│   │   │   ├── Program.cs
│   │   │   └── appsettings.json
│   │   ├── YourSneaker.Application/  # Business logic layer
│   │   │   ├── Services/
│   │   │   ├── DTOs/
│   │   │   ├── Interfaces/
│   │   │   └── Validators/
│   │   ├── YourSneaker.Domain/       # Domain entities layer
│   │   │   ├── Entities/
│   │   │   └── Enums/
│   │   └── YourSneaker.Infrastructure/ # Data access layer
│   │       ├── Persistence/
│   │       │   ├── AppDbContext.cs
│   │       │   ├── Configurations/
│   │       │   └── Migrations/
│   │       └── Repositories/
│   └── tests/
│       └── YourSneaker.Tests/
│
└── client/                           # React Frontend
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    ├── index.html
    └── src/
        ├── api/                      # Axios instance + API functions
        ├── assets/                   # Images, fonts, icons
        ├── components/               # Shared/reusable components
        │   ├── ui/                   # Button, Modal, Input, Badge...
        │   └── layout/              # Header, Footer, Sidebar...
        ├── features/                 # Feature-based modules
        │   ├── auth/
        │   ├── products/
        │   ├── cart/
        │   ├── orders/
        │   └── admin/
        ├── hooks/                    # Custom React hooks
        ├── pages/                    # Route-level page components
        ├── routes/                   # React Router configuration
        ├── store/                    # Zustand stores
        ├── styles/                   # Global CSS, variables, themes
        ├── types/                    # TypeScript type definitions
        ├── utils/                    # Helper/utility functions
        ├── App.tsx
        └── main.tsx
```

## Coding Conventions

### General
- Ngôn ngữ code: **English** (tên biến, hàm, comments)
- Ngôn ngữ UI: **Tiếng Việt** (labels, messages, placeholders — vì target thị trường VN)
- Mỗi file nên có 1 trách nhiệm rõ ràng (Single Responsibility)
- Không hardcode secrets, connection strings — dùng environment variables / appsettings

### C# / Backend
- Naming: PascalCase cho class/method/property, camelCase cho local variables
- Async/await cho tất cả I/O operations
- Return `IActionResult` hoặc `ActionResult<T>` từ controllers
- DTOs cho request/response — KHÔNG expose entity trực tiếp ra API
- Validate input tại Application layer (FluentValidation hoặc DataAnnotations)
- Repository pattern qua interfaces (DI injection)
- Global exception handling middleware
- Sử dụng `ILogger<T>` cho logging

### TypeScript / Frontend
- Naming: PascalCase cho components, camelCase cho functions/variables
- Functional components only (không dùng class components)
- Custom hooks cho logic tái sử dụng (`useAuth`, `useCart`, `useProducts`...)
- Tách business logic khỏi UI components
- Type-safe: tránh `any`, define interfaces/types rõ ràng
- Error boundaries cho error handling
- Lazy loading cho routes (React.lazy + Suspense)

### CSS / Styling
- CSS Variables cho design tokens (colors, spacing, fonts)
- Mobile-first responsive design
- BEM naming convention hoặc CSS Modules
- Dark theme là default (streetwear vibe)
- Smooth transitions/animations cho micro-interactions
- Tránh inline styles — dùng CSS classes

### Git
- Branch naming: `feature/xxx`, `fix/xxx`, `docs/xxx`
- Commit messages: conventional commits (`feat:`, `fix:`, `docs:`, `refactor:`, `style:`)
- Không commit `node_modules/`, `bin/`, `obj/`, `.env`

## API Design Rules
- RESTful conventions: đúng HTTP methods (GET/POST/PUT/DELETE)
- Versioning: `/api/v1/...`
- Consistent response format:
  ```json
  {
    "success": true,
    "data": { ... },
    "message": "string",
    "errors": []
  }
  ```
- Pagination response:
  ```json
  {
    "success": true,
    "data": {
      "items": [...],
      "page": 1,
      "pageSize": 12,
      "totalItems": 100,
      "totalPages": 9
    }
  }
  ```
- HTTP status codes chuẩn: 200, 201, 400, 401, 403, 404, 500
- CORS configured cho frontend origin

## Security Rules
- Passwords hashed với BCrypt
- JWT tokens có expiry ngắn (15-30 phút), refresh token dài hơn (7 ngày)
- Input sanitization chống SQL injection, XSS
- Rate limiting trên auth endpoints
- HTTPS trong production
- Sensitive data KHÔNG log ra console

## Testing Strategy
- Backend: xUnit + Moq cho unit tests (Services, Validators)
- Frontend: Vitest + React Testing Library cho component tests
- Tối thiểu: test các service chính (AuthService, ProductService, OrderService)

## Performance Considerations
- Lazy loading images (frontend)
- Pagination cho danh sách sản phẩm (không load all)
- Caching strategy cho dữ liệu ít thay đổi (categories)
- Index database columns dùng trong WHERE/JOIN
- Gzip compression cho API responses
