# API Specification — YourSneaker

Base URL: `https://localhost:5001/api/v1`

## Standard Response Format
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful",
  "errors": []
}
```

## Paginated Response
```json
{
  "success": true,
  "data": {
    "items": [],
    "page": 1,
    "pageSize": 12,
    "totalItems": 100,
    "totalPages": 9
  }
}
```

---

## Auth Endpoints

| Method | Endpoint                | Auth  | Description           |
|--------|-------------------------|-------|-----------------------|
| POST   | `/auth/register`        | No    | Register new customer |
| POST   | `/auth/login`           | No    | Login, returns tokens |
| POST   | `/auth/refresh`         | No    | Refresh access token  |
| POST   | `/auth/logout`          | Yes   | Revoke refresh token  |
| GET    | `/auth/me`              | Yes   | Get current user info |

### POST `/auth/register`
```json
// Request
{ "email": "string", "password": "string", "fullName": "string", "phone": "string?" }

// Response 201
{ "success": true, "data": { "id": "guid", "email": "string", "fullName": "string" } }
```

### POST `/auth/login`
```json
// Request
{ "email": "string", "password": "string" }

// Response 200
{ "success": true, "data": { "accessToken": "string", "refreshToken": "string", "user": { "id", "email", "fullName", "role" } } }
```

---

## Product Endpoints

| Method | Endpoint                       | Auth  | Description               |
|--------|--------------------------------|-------|---------------------------|
| GET    | `/products`                    | No    | List products (paginated) |
| GET    | `/products/{id}`               | No    | Get product detail        |
| GET    | `/products/slug/{slug}`        | No    | Get product by slug       |
| POST   | `/products`                    | Admin | Create product            |
| PUT    | `/products/{id}`               | Admin | Update product            |
| DELETE | `/products/{id}`               | Admin | Delete product            |

### GET `/products` — Query Parameters
| Param      | Type    | Default | Description                     |
|------------|---------|---------|----------------------------------|
| page       | int     | 1       | Page number                      |
| pageSize   | int     | 12      | Items per page                   |
| search     | string  | null    | Search by name/brand             |
| categoryId | int     | null    | Filter by category               |
| brand      | string  | null    | Filter by brand                  |
| minPrice   | decimal | null    | Min price filter                 |
| maxPrice   | decimal | null    | Max price filter                 |
| sortBy     | string  | newest  | newest/price_asc/price_desc/popular |

---

## Category Endpoints

| Method | Endpoint              | Auth  | Description          |
|--------|-----------------------|-------|----------------------|
| GET    | `/categories`         | No    | List all categories  |
| GET    | `/categories/{id}`    | No    | Get category detail  |
| POST   | `/categories`         | Admin | Create category      |
| PUT    | `/categories/{id}`    | Admin | Update category      |
| DELETE | `/categories/{id}`    | Admin | Delete category      |

---

## Cart Endpoints

| Method | Endpoint                   | Auth | Description              |
|--------|----------------------------|------|--------------------------|
| GET    | `/cart`                    | Yes  | Get user's cart           |
| POST   | `/cart/items`              | Yes  | Add item to cart          |
| PUT    | `/cart/items/{id}`         | Yes  | Update item quantity      |
| DELETE | `/cart/items/{id}`         | Yes  | Remove item from cart     |
| DELETE | `/cart`                    | Yes  | Clear entire cart         |

---

## Order Endpoints

| Method | Endpoint                        | Auth     | Description              |
|--------|---------------------------------|----------|--------------------------|
| POST   | `/orders`                       | Customer | Create order (checkout)  |
| GET    | `/orders/my`                    | Customer | Get my orders            |
| GET    | `/orders/my/{id}`               | Customer | Get my order detail      |
| GET    | `/admin/orders`                 | Admin    | List all orders          |
| GET    | `/admin/orders/{id}`            | Admin    | Get order detail         |
| PUT    | `/admin/orders/{id}/status`     | Admin    | Update order status      |

### POST `/orders`
```json
// Request
{
  "shippingAddress": "string",
  "shippingPhone": "string",
  "note": "string?",
  "paymentMethod": "COD" | "VNPay"
}
// Cart items are read from user's cart automatically
```

---

## Admin Dashboard Endpoints

| Method | Endpoint                     | Auth  | Description               |
|--------|------------------------------|-------|---------------------------|
| GET    | `/admin/dashboard/stats`     | Admin | Overview statistics        |
| GET    | `/admin/dashboard/revenue`   | Admin | Revenue by period          |
| GET    | `/admin/dashboard/top-products` | Admin | Best selling products   |

---

## Review Endpoints (Phase 4)

| Method | Endpoint                        | Auth     | Description          |
|--------|---------------------------------|----------|----------------------|
| GET    | `/products/{id}/reviews`        | No       | Get product reviews  |
| POST   | `/products/{id}/reviews`        | Customer | Create review        |
| PUT    | `/reviews/{id}`                 | Customer | Update own review    |
| DELETE | `/reviews/{id}`                 | Customer | Delete own review    |

---

## Wishlist Endpoints (Phase 4)

| Method | Endpoint                  | Auth     | Description             |
|--------|---------------------------|----------|-------------------------|
| GET    | `/wishlist`               | Customer | Get user's wishlist     |
| POST   | `/wishlist/{productId}`   | Customer | Add to wishlist         |
| DELETE | `/wishlist/{productId}`   | Customer | Remove from wishlist    |

---

## Payment Endpoints (Phase 4)

| Method | Endpoint                  | Auth     | Description             |
|--------|---------------------------|----------|-------------------------|
| POST   | `/payment/vnpay/create`   | Customer | Create VNPay payment URL|
| GET    | `/payment/vnpay/callback` | No       | VNPay IPN callback      |

---

## HTTP Status Codes
| Code | Meaning              |
|------|----------------------|
| 200  | OK                   |
| 201  | Created              |
| 400  | Bad Request          |
| 401  | Unauthorized         |
| 403  | Forbidden            |
| 404  | Not Found            |
| 409  | Conflict (duplicate) |
| 422  | Validation Error     |
| 500  | Internal Server Error|
