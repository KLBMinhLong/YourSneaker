# Database Schema — YourSneaker

## ERD (Entity Relationship)

```
Users ──1:N──► Orders ──1:N──► OrderItems ◄──N:1── Products
  │                                                    │
  │──1:N──► CartItems ◄──N:1──────────────────────────┘
  │                                                    │
  │──1:N──► Reviews ◄──N:1────────────────────────────┘
  │
  └──1:N──► RefreshTokens
                                    Categories ──1:N──► Products
```

## Tables

### Users
| Column       | Type           | Constraints                    |
|-------------|----------------|--------------------------------|
| Id          | CHAR(36)       | PK, GUID                      |
| Email       | VARCHAR(255)   | UNIQUE, NOT NULL               |
| PasswordHash| VARCHAR(500)   | NOT NULL                       |
| FullName    | VARCHAR(200)   | NOT NULL                       |
| Phone       | VARCHAR(20)    | NULLABLE                       |
| Address     | VARCHAR(500)   | NULLABLE                       |
| AvatarUrl   | VARCHAR(500)   | NULLABLE                       |
| Role        | ENUM           | 'Customer','Admin', DEFAULT 'Customer' |
| CreatedAt   | DATETIME       | NOT NULL, DEFAULT NOW()        |
| UpdatedAt   | DATETIME       | NOT NULL, DEFAULT NOW()        |

### Categories
| Column       | Type           | Constraints                    |
|-------------|----------------|--------------------------------|
| Id          | INT            | PK, AUTO_INCREMENT             |
| Name        | VARCHAR(100)   | NOT NULL                       |
| Slug        | VARCHAR(100)   | UNIQUE, NOT NULL               |
| Description | VARCHAR(500)   | NULLABLE                       |
| ImageUrl    | VARCHAR(500)   | NULLABLE                       |
| CreatedAt   | DATETIME       | NOT NULL                       |

### Products
| Column       | Type           | Constraints                    |
|-------------|----------------|--------------------------------|
| Id          | CHAR(36)       | PK, GUID                      |
| Name        | VARCHAR(200)   | NOT NULL                       |
| Slug        | VARCHAR(200)   | UNIQUE, NOT NULL               |
| Description | TEXT           | NULLABLE                       |
| Price       | DECIMAL(18,2)  | NOT NULL                       |
| OriginalPrice| DECIMAL(18,2) | NULLABLE (for sale display)    |
| Stock       | INT            | NOT NULL, DEFAULT 0            |
| CategoryId  | INT            | FK → Categories.Id             |
| Brand       | VARCHAR(100)   | NOT NULL                       |
| ImageUrl    | VARCHAR(500)   | NOT NULL                       |
| Images      | JSON           | Array of image URLs            |
| Sizes       | JSON           | Available sizes array          |
| Colors      | JSON           | Available colors array         |
| IsFeatured  | BOOLEAN        | DEFAULT FALSE                  |
| IsActive    | BOOLEAN        | DEFAULT TRUE                   |
| CreatedAt   | DATETIME       | NOT NULL                       |
| UpdatedAt   | DATETIME       | NOT NULL                       |

### Orders
| Column       | Type           | Constraints                    |
|-------------|----------------|--------------------------------|
| Id          | CHAR(36)       | PK, GUID                      |
| UserId      | CHAR(36)       | FK → Users.Id, NOT NULL        |
| Status      | ENUM           | Pending/Confirmed/Shipping/Completed/Cancelled |
| TotalAmount | DECIMAL(18,2)  | NOT NULL                       |
| ShippingAddress | VARCHAR(500)| NOT NULL                       |
| ShippingPhone   | VARCHAR(20) | NOT NULL                       |
| Note        | VARCHAR(500)   | NULLABLE                       |
| PaymentMethod| VARCHAR(50)   | 'COD','VNPay'                  |
| PaymentStatus| ENUM          | Pending/Paid/Failed            |
| CreatedAt   | DATETIME       | NOT NULL                       |
| UpdatedAt   | DATETIME       | NOT NULL                       |

### OrderItems
| Column       | Type           | Constraints                    |
|-------------|----------------|--------------------------------|
| Id          | INT            | PK, AUTO_INCREMENT             |
| OrderId     | CHAR(36)       | FK → Orders.Id                 |
| ProductId   | CHAR(36)       | FK → Products.Id               |
| ProductName | VARCHAR(200)   | NOT NULL (snapshot)            |
| Quantity    | INT            | NOT NULL                       |
| UnitPrice   | DECIMAL(18,2)  | NOT NULL (snapshot)            |
| Size        | VARCHAR(10)    | NULLABLE                       |
| Color       | VARCHAR(50)    | NULLABLE                       |

### CartItems
| Column       | Type           | Constraints                    |
|-------------|----------------|--------------------------------|
| Id          | INT            | PK, AUTO_INCREMENT             |
| UserId      | CHAR(36)       | FK → Users.Id                  |
| ProductId   | CHAR(36)       | FK → Products.Id               |
| Quantity    | INT            | NOT NULL, DEFAULT 1            |
| Size        | VARCHAR(10)    | NULLABLE                       |
| Color       | VARCHAR(50)    | NULLABLE                       |
| CreatedAt   | DATETIME       | NOT NULL                       |

UNIQUE constraint: (UserId, ProductId, Size, Color)

### Reviews
| Column       | Type           | Constraints                    |
|-------------|----------------|--------------------------------|
| Id          | INT            | PK, AUTO_INCREMENT             |
| ProductId   | CHAR(36)       | FK → Products.Id               |
| UserId      | CHAR(36)       | FK → Users.Id                  |
| Rating      | TINYINT        | NOT NULL, CHECK 1-5            |
| Comment     | TEXT           | NULLABLE                       |
| CreatedAt   | DATETIME       | NOT NULL                       |

UNIQUE constraint: (ProductId, UserId)

### RefreshTokens
| Column       | Type           | Constraints                    |
|-------------|----------------|--------------------------------|
| Id          | INT            | PK, AUTO_INCREMENT             |
| UserId      | CHAR(36)       | FK → Users.Id                  |
| Token       | VARCHAR(500)   | NOT NULL                       |
| ExpiresAt   | DATETIME       | NOT NULL                       |
| CreatedAt   | DATETIME       | NOT NULL                       |
| IsRevoked   | BOOLEAN        | DEFAULT FALSE                  |

## Indexes
- `Users`: INDEX on Email
- `Products`: INDEX on CategoryId, Slug, Brand, IsActive
- `Orders`: INDEX on UserId, Status, CreatedAt
- `OrderItems`: INDEX on OrderId, ProductId
- `CartItems`: INDEX on UserId
- `Reviews`: INDEX on ProductId, UserId

## Seed Data
- 1 Admin user (admin@yoursneaker.vn / Admin@123)
- 5-8 Categories (Sneaker, Running, Basketball, Lifestyle, Sandals, Boots, Limited Edition, Sale)
- 20-30 Products across categories with sample images
