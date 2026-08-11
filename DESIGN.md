# DESIGN.md — YourSneaker Design System

## Brand Identity

**YourSneaker** — Premium streetwear sneaker store.
Phong cách: **Urban, Bold, Premium Dark** — lấy cảm hứng từ các brand như Nike SNKRS, StockX, GOAT.

### Design Principles
1. **Dark-first**: Nền tối tạo cảm giác premium, làm nổi bật sản phẩm
2. **Bold Typography**: Font lớn, mạnh mẽ, tạo ấn tượng thị giác
3. **High Contrast**: Màu neon/accent nổi bật trên nền tối
4. **Motion**: Micro-animations tạo cảm giác sống động, interactive
5. **Product-centric**: Sản phẩm (giày) là trung tâm, UI phục vụ việc showcase sản phẩm

---

## Color Palette

### Primary Colors
| Token                | Value       | Usage                              |
|----------------------|-------------|-------------------------------------|
| `--color-bg-primary`   | `#0A0A0A`   | Main background                    |
| `--color-bg-secondary` | `#141414`   | Cards, sections                    |
| `--color-bg-elevated`  | `#1E1E1E`   | Modals, dropdowns, elevated surfaces |
| `--color-bg-hover`     | `#2A2A2A`   | Hover states                       |

### Accent Colors
| Token                | Value       | Usage                              |
|----------------------|-------------|-------------------------------------|
| `--color-accent`       | `#CDFF50`   | Primary accent (lime/neon green)   |
| `--color-accent-hover` | `#B8E645`   | Accent hover state                 |
| `--color-accent-muted` | `rgba(205, 255, 80, 0.15)` | Accent backgrounds   |
| `--color-hot`          | `#FF4D4D`   | Sale badges, urgent, destructive   |
| `--color-hot-muted`    | `rgba(255, 77, 77, 0.15)` | Sale backgrounds     |

### Text Colors
| Token                | Value       | Usage                              |
|----------------------|-------------|-------------------------------------|
| `--color-text-primary`   | `#FFFFFF`   | Headings, primary content        |
| `--color-text-secondary` | `#A0A0A0`   | Descriptions, labels            |
| `--color-text-muted`     | `#666666`   | Placeholders, disabled text     |
| `--color-text-on-accent` | `#0A0A0A`   | Text on accent-colored surfaces |

### Status Colors
| Token              | Value       | Usage              |
|--------------------|-------------|---------------------|
| `--color-success`    | `#22C55E`   | Success states      |
| `--color-warning`    | `#F59E0B`   | Warning states      |
| `--color-error`      | `#EF4444`   | Error states        |
| `--color-info`       | `#3B82F6`   | Info states         |

### Border & Divider
| Token              | Value       | Usage              |
|--------------------|-------------|---------------------|
| `--color-border`     | `#2A2A2A`   | Default borders    |
| `--color-border-hover`| `#3A3A3A`  | Hover borders      |
| `--color-divider`    | `#1E1E1E`   | Divider lines      |

---

## Typography

### Font Families
```css
--font-heading: 'Oswald', sans-serif;       /* Bold, condensed — streetwear feel */
--font-body: 'Inter', sans-serif;            /* Clean, readable body text */
--font-mono: 'JetBrains Mono', monospace;    /* Code, prices */
```

### Font Sizes (rem scale)
| Token          | Size     | Line Height | Usage                    |
|----------------|----------|-------------|--------------------------|
| `--text-xs`      | 0.75rem  | 1rem        | Badges, captions         |
| `--text-sm`      | 0.875rem | 1.25rem     | Helper text, labels      |
| `--text-base`    | 1rem     | 1.5rem      | Body text                |
| `--text-lg`      | 1.125rem | 1.75rem     | Large body, card titles  |
| `--text-xl`      | 1.25rem  | 1.75rem     | Section subtitles        |
| `--text-2xl`     | 1.5rem   | 2rem        | Card headings            |
| `--text-3xl`     | 1.875rem | 2.25rem     | Section headings         |
| `--text-4xl`     | 2.25rem  | 2.5rem      | Page titles              |
| `--text-5xl`     | 3rem     | 1           | Hero heading             |
| `--text-display`  | 4.5rem   | 1           | Hero display text        |

### Font Weights
| Token             | Value | Usage                |
|-------------------|-------|----------------------|
| `--font-regular`    | 400   | Body text            |
| `--font-medium`     | 500   | Labels, UI elements  |
| `--font-semibold`   | 600   | Subheadings          |
| `--font-bold`       | 700   | Headings             |
| `--font-black`      | 900   | Display / Hero text  |

---

## Spacing Scale
```css
--space-1:  0.25rem;   /* 4px */
--space-2:  0.5rem;    /* 8px */
--space-3:  0.75rem;   /* 12px */
--space-4:  1rem;      /* 16px */
--space-5:  1.25rem;   /* 20px */
--space-6:  1.5rem;    /* 24px */
--space-8:  2rem;      /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
```

---

## Border Radius
```css
--radius-sm:   4px;
--radius-md:   8px;
--radius-lg:   12px;
--radius-xl:   16px;
--radius-2xl:  24px;
--radius-full: 9999px;  /* Pills, avatars */
```

---

## Shadows
```css
--shadow-sm:  0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md:  0 4px 6px rgba(0, 0, 0, 0.4);
--shadow-lg:  0 10px 15px rgba(0, 0, 0, 0.5);
--shadow-xl:  0 20px 25px rgba(0, 0, 0, 0.6);
--shadow-glow: 0 0 20px rgba(205, 255, 80, 0.3);    /* Neon glow effect */
--shadow-glow-hot: 0 0 20px rgba(255, 77, 77, 0.3);  /* Sale glow */
```

---

## Transitions & Animations
```css
--transition-fast:   150ms ease;
--transition-base:   250ms ease;
--transition-slow:   350ms ease;
--transition-spring: 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Keyframe Animations
- **fadeIn**: opacity 0 → 1, translateY(10px) → 0
- **slideUp**: translateY(20px) → 0 with opacity
- **slideInLeft**: translateX(-20px) → 0 with opacity
- **scaleIn**: scale(0.95) → 1 with opacity
- **shimmer**: skeleton loading shimmer effect
- **pulse**: subtle scale pulse for CTAs
- **float**: gentle floating animation for hero product image

---

## Breakpoints (Mobile-First)
```css
--bp-sm:  640px;   /* Small tablets */
--bp-md:  768px;   /* Tablets */
--bp-lg:  1024px;  /* Small laptops */
--bp-xl:  1280px;  /* Desktops */
--bp-2xl: 1536px;  /* Large desktops */
```

---

## Z-Index Scale
```css
--z-base:     1;
--z-dropdown: 100;
--z-sticky:   200;
--z-overlay:  300;
--z-modal:    400;
--z-toast:    500;
```

---

## Component Design Tokens

### Buttons
| Variant    | Background           | Text Color           | Border      |
|------------|----------------------|----------------------|-------------|
| Primary    | `--color-accent`      | `--color-text-on-accent` | none        |
| Secondary  | `transparent`         | `--color-text-primary` | `--color-border` |
| Ghost      | `transparent`         | `--color-text-secondary` | none        |
| Danger     | `--color-hot`         | `#FFFFFF`             | none        |

Button sizes: `sm` (32px height), `md` (40px height), `lg` (48px height), `xl` (56px height)

### Cards (Product Card)
- Background: `--color-bg-secondary`
- Border: 1px solid `--color-border`
- Border Radius: `--radius-lg`
- Hover: border-color → `--color-accent`, subtle translateY(-4px), shadow-glow
- Image aspect ratio: 1:1 (square) hoặc 4:3
- Badge (New/Sale/Hot): absolute positioned, pill shape

### Input Fields
- Background: `--color-bg-elevated`
- Border: 1px solid `--color-border`
- Focus: border-color → `--color-accent`, box-shadow glow
- Border Radius: `--radius-md`
- Height: 44px (comfortable touch target)
- Placeholder color: `--color-text-muted`

### Navigation
- Background: `--color-bg-primary` with backdrop-filter: blur(12px)
- Sticky top, z-index: `--z-sticky`
- Logo: Bold, Oswald font, accent color
- Links: `--color-text-secondary`, hover → `--color-text-primary`
- Cart icon with item count badge (accent color)

### Badges
- Size tags: pill shape, small, `--color-bg-elevated`
- Status badges: color-coded by order status
- Sale badge: `--color-hot` background, white text
- New badge: `--color-accent` background, dark text

---

## Page Layout Specs

### Homepage
1. **Hero Section**: Full-width, featured sneaker with large display text, CTA button
2. **Trending / New Arrivals**: Horizontal scroll or grid of product cards
3. **Categories**: Grid of category cards with background images
4. **Featured Products**: Product grid with filters
5. **Newsletter/CTA Banner**: Accent background, email input

### Product Listing Page
- Filter sidebar (desktop) / bottom sheet (mobile)
- Grid: 4 columns (desktop), 2 columns (mobile)
- Sort dropdown: Price, Newest, Popular
- Skeleton loading states

### Product Detail Page
- Large product image gallery (zoom on hover)
- Product info: name, price, sizes, color variants
- Add to cart CTA (sticky on mobile)
- Related products section
- Reviews section (Phase 4)

### Cart Page
- Cart items list with quantity controls
- Order summary sidebar
- Checkout CTA

### Admin Dashboard
- Sidebar navigation
- Stats cards (revenue, orders, products)
- Charts (simple bar/line)
- Data tables with pagination

---

## Iconography
- Style: Outline/linear icons (Lucide React hoặc Phosphor Icons)
- Size: 16px (sm), 20px (md), 24px (lg)
- Color: inherit from parent text color

---

## Image Guidelines
- Product images: High quality, white/neutral background, square (1:1)
- Hero images: Full-width, high contrast, lifestyle shots
- Lazy loading for all images
- WebP format preferred, fallback to JPEG/PNG
- Placeholder: skeleton shimmer while loading
