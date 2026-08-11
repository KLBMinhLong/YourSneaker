# Architecture — YourSneaker

## System Overview

```
┌─────────────────┐     HTTP/REST      ┌─────────────────────────────────────────┐
│   React Client  │ ◄──────────────► │       ASP.NET Core Web API              │
│   (Vite + TS)   │    JSON + JWT      │                                         │
│   Port: 5173    │                    │  ┌─────────────────────────────────┐    │
└─────────────────┘                    │  │  Api Layer (Controllers)        │    │
                                       │  │  ↓                              │    │
                                       │  │  Application Layer (Services)   │    │
                                       │  │  ↓                              │    │
                                       │  │  Domain Layer (Entities)        │    │
                                       │  │  ↓                              │    │
                                       │  │  Infrastructure (EF Core)       │    │
                                       │  └─────────────────────────────────┘    │
                                       │   Port: 5001                           │
                                       └──────────────────┬──────────────────────┘
                                                          │ EF Core
                                                          ▼
                                                ┌──────────────────┐
                                                │   MySQL 8.0      │
                                                │   (Docker)       │
                                                │   Port: 3306     │
                                                └──────────────────┘
```

## Clean Architecture Layers

### 1. Domain Layer (`YourSneaker.Domain`)
- **Entities**: User, Product, Category, Order, OrderItem, CartItem, Review
- **Enums**: OrderStatus, UserRole
- **No dependencies** on other layers
- Pure C# classes, business rules thuần

### 2. Application Layer (`YourSneaker.Application`)
- **Services**: AuthService, ProductService, OrderService, CartService, etc.
- **DTOs**: Request/Response objects cho mỗi endpoint
- **Interfaces**: IProductRepository, IOrderRepository, etc.
- **Validators**: Input validation logic
- Depends on: Domain

### 3. Infrastructure Layer (`YourSneaker.Infrastructure`)
- **AppDbContext**: EF Core DbContext, entity configurations
- **Repositories**: Implement interfaces từ Application layer
- **Migrations**: Database schema versioning
- Depends on: Domain, Application

### 4. Api Layer (`YourSneaker.Api`)
- **Controllers**: HTTP endpoint handlers
- **Middleware**: Exception handling, authentication, CORS
- **Program.cs**: DI registration, pipeline configuration
- Depends on: Application, Infrastructure (for DI registration)

## Dependency Flow
```
Api → Application → Domain
Api → Infrastructure → Application → Domain
```
Domain KHÔNG depend vào bất kỳ layer nào khác.

## Authentication Flow
```
1. POST /api/v1/auth/login { email, password }
2. Server validates → returns { accessToken, refreshToken }
3. Client stores tokens (httpOnly cookie or localStorage)
4. Client sends Authorization: Bearer <accessToken> on each request
5. When accessToken expires → POST /api/v1/auth/refresh { refreshToken }
6. Server validates refreshToken → returns new token pair
```

## Frontend Architecture
```
React App
├── Routes (React Router)
│   ├── Public Routes (Home, Products, Login, Register)
│   ├── Protected Routes (Cart, Checkout, Orders) — requires auth
│   └── Admin Routes (Dashboard, Product CRUD, Order Management) — requires admin role
├── State Management
│   ├── Server State: TanStack Query (products, orders, categories)
│   └── Client State: Zustand (cart, auth, UI state)
└── API Layer
    └── Axios instance with interceptors (auth headers, token refresh, error handling)
```
