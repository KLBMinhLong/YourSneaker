# Project Phases — YourSneaker

**Timeline**: 1 tuần (11/08 – 17/08/2026)

---

## Phase 1 — Foundation (Ngày 1-2)

### Backend
- [x] Project setup: Clean Architecture solution structure
- [x] Docker + MySQL setup
- [x] EF Core DbContext + entity configurations
- [x] Initial migration (Users, Products, Categories)
- [x] Seed data (admin user, categories, sample products)
- [x] Auth: Register, Login, JWT + Refresh Token
- [x] Product CRUD endpoints
- [x] Category CRUD endpoints
- [x] Search, filter, sort, pagination cho products
- [x] Global exception handling middleware
- [x] Swagger configuration

### Frontend
- [x] Vite + React + TypeScript setup
- [x] CSS design system (variables, base styles, components)
- [x] Layout components (Header, Footer, Sidebar)
- [x] Auth pages (Login, Register)
- [x] Homepage (Hero, Featured Products, Categories)
- [x] Product listing page (grid, filters, search, pagination)
- [x] Product detail page
- [x] Axios setup + API layer
- [x] Auth state management (Zustand)
- [x] Protected routes

---

## Phase 2 — Shopping (Ngày 3-4)

### Backend
- [x] Cart endpoints (CRUD cart items - Managed via Client Store & Orders payload)
- [x] Order endpoints (create order, get my orders)
- [x] Order status management
- [x] Stock validation khi đặt hàng
- [x] Order history endpoint

### Frontend
- [x] Cart page (items list, quantity controls, summary)
- [x] Cart icon with item count in header
- [x] Checkout page (shipping info form, order summary)
- [x] Order confirmation page
- [x] Order history page
- [x] Order detail page
- [x] Toast notifications & feedback
- [x] Loading states + skeleton screens

---

## Phase 3 — Admin Dashboard (Ngày 5)

### Backend
- [x] Dashboard stats endpoint (revenue, orders count, products count)
- [x] Revenue & top selling products calculation service
- [x] Admin order management (list all, update status)
- [x] Product CRUD endpoints (Create, Read, Update, Delete)

### Frontend
- [x] Admin layout (sidebar navigation, store switcher)
- [x] Dashboard page (stats cards, top selling products, recent orders)
- [x] Product management page (table, create/edit modal, delete action)
- [x] Order management page (table, status selector update)
- [x] Dark Streetwear UI aesthetic for Admin Portal

---

## Phase 4 — Premium Features (Ngày 6-7)

### Backend
- [x] VNPay sandbox integration (create payment URL, HMACSHA512 signature, IPN callback verification)
- [x] Payment return verification service (`VnPayService`)
- [x] Payment controller endpoints (`PaymentController`)

### Frontend
- [x] VNPay payment flow (Redirect & Return handler)
- [x] VNPay return page (`PaymentReturnPage.tsx`)
- [x] Real-time order payment status update

### Polish & Deploy Prep
- [x] Responsive testing (mobile, tablet, desktop)
- [x] Error handling đầy đủ (loading, error, empty states)
- [x] Final UI polish (glassmorphism, vibrant streetwear theme)
- [x] Clean architecture & production build verification

---

## Definition of Done
Mỗi task được coi là **done** khi:
1. Code works correctly (no errors)
2. API returns correct response format
3. UI matches design system
4. Responsive trên mobile + desktop
5. Error handling đầy đủ (loading, error, empty states)
