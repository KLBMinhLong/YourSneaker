# Project Phases — YourSneaker

**Timeline**: 1 tuần (11/08 – 17/08/2026)

---

## Phase 1 — Foundation (Ngày 1-2)

### Backend
- [x] Project setup: Clean Architecture solution structure
- [ ] Docker + MySQL setup
- [ ] EF Core DbContext + entity configurations
- [ ] Initial migration (Users, Products, Categories)
- [ ] Seed data (admin user, categories, sample products)
- [ ] Auth: Register, Login, JWT + Refresh Token
- [ ] Product CRUD endpoints
- [ ] Category CRUD endpoints
- [ ] Search, filter, sort, pagination cho products
- [ ] Global exception handling middleware
- [ ] Swagger configuration

### Frontend
- [ ] Vite + React + TypeScript setup
- [ ] CSS design system (variables, base styles, components)
- [ ] Layout components (Header, Footer, Sidebar)
- [ ] Auth pages (Login, Register)
- [ ] Homepage (Hero, Featured Products, Categories)
- [ ] Product listing page (grid, filters, search, pagination)
- [ ] Product detail page
- [ ] Axios setup + API layer
- [ ] Auth state management (Zustand)
- [ ] Protected routes

---

## Phase 2 — Shopping (Ngày 3-4)

### Backend
- [ ] Cart endpoints (CRUD cart items)
- [ ] Order endpoints (create order, get my orders)
- [ ] Order status management
- [ ] Stock validation khi đặt hàng
- [ ] Order history endpoint

### Frontend
- [ ] Cart page (items list, quantity controls, summary)
- [ ] Cart icon with item count in header
- [ ] Checkout page (shipping info form, order summary)
- [ ] Order confirmation page
- [ ] Order history page
- [ ] Order detail page
- [ ] Toast notifications
- [ ] Loading states + skeleton screens

---

## Phase 3 — Admin Dashboard (Ngày 5)

### Backend
- [ ] Dashboard stats endpoint (revenue, orders count, products count)
- [ ] Revenue by period endpoint (daily/monthly)
- [ ] Top selling products endpoint
- [ ] Admin order management (list all, update status)
- [ ] Product image upload endpoint

### Frontend
- [ ] Admin layout (sidebar navigation)
- [ ] Dashboard page (stats cards, charts)
- [ ] Product management page (table, create/edit modal)
- [ ] Category management page
- [ ] Order management page (table, status update)
- [ ] Image upload component
- [ ] Data tables with pagination

---

## Phase 4 — Premium Features (Ngày 6-7)

### Backend
- [ ] VNPay sandbox integration (create payment URL, IPN callback)
- [ ] Review endpoints (CRUD)
- [ ] Wishlist endpoints
- [ ] Email service (order confirmation)

### Frontend
- [ ] VNPay payment flow
- [ ] Product reviews section (stars, comments)
- [ ] Review form
- [ ] Wishlist page
- [ ] Email confirmation UI

### Polish & Deploy Prep
- [ ] Responsive testing (mobile, tablet, desktop)
- [ ] Performance optimization (lazy loading, code splitting)
- [ ] SEO meta tags
- [ ] Error pages (404, 500)
- [ ] Final UI polish (animations, transitions)
- [ ] README update with screenshots
- [ ] GitHub repo cleanup

---

## Definition of Done
Mỗi task được coi là **done** khi:
1. Code works correctly (no errors)
2. API returns correct response format
3. UI matches design system
4. Responsive trên mobile + desktop
5. Error handling đầy đủ (loading, error, empty states)
