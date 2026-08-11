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
