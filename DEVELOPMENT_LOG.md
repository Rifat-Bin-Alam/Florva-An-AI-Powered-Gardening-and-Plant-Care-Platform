# FLORVA — DEVELOPMENT AUDIT LOG

**Academic Practicum Project**  
**Student Name:** Rifat Bin Alam  
**Institution:** International University of Business Agriculture and Technology (IUBAT)  

---

## 📅 Log Entry: 2026-11-01 (Part 1) — Phase 0: Project Initialization & Master Architectural Planning
- Initialized repository documentation based on workspace root `Proposal.pdf`.
- Established MERN architecture, visual identity tokens, and initial 14-week roadmap.
- Formulated `README.md`, `PROJECT_PLAN.md`, `ARCHITECTURE.md`, `DATABASE_SCHEMA.md`, `API_DOCUMENTATION.md`, `PROJECT_STATUS.md`, and `DEVELOPMENT_LOG.md`.

---

## 📅 Log Entry: 2026-11-01 (Part 2) — Phase 0 Refinements: Payment Security, Role Boundaries & Visual Mockups
- Evaluated SSLCommerz Sandbox vs Stripe vs bKash PGW; recommended SSLCommerz with Stripe fallback.
- Enforced authoritative server-to-server gateway validation (IPN webhook) with zero frontend trust.
- Strictly delineated Gardener operational duties from Administrator governance duties per `Proposal.pdf`.
- Added immutable price snapshotting to `Order` (`priceAtPurchase`) and `Booking` (`priceAtBooking`).
- Created visual UI layout mockups for 6 core customer and dashboard views.

---

## 📅 Log Entry: 2026-11-01 (Part 3) — Privacy Cleanup Audit
- Conducted recursive regex audit across entire workspace for student ID and supervisor name.
- Cleaned all occurrences from documentation and project files.
- Preserved student name (**Rifat Bin Alam**) for project attribution and copyright sections.
- Verified recursive grep returned 0 matches for sensitive identifying information.

---

## 📅 Log Entry: 2026-11-01 (Part 4) — Phase 1: Project Scaffolding & Foundation Implementation

### Summary of Implementation Actions:
1. **Express Backend Scaffolding (`server/`):**
   - Initialized `server/package.json` with `express`, `mongoose`, `dotenv`, `cors`, `helmet`, `morgan`, and `nodemon`.
   - Created `server/src/config/db.js` featuring Mongoose connection manager with 5-second timeout and connection status inspector.
   - Implemented `server/src/middleware/errorMiddleware.js` for structured 404 handling and centralized JSON error responses.
   - Built `server/src/app.js` with CORS configuration, helmet headers, body parsing, root information endpoint (`GET /`), and health check (`GET /api/health`).
   - Built `server/src/server.js` with port binding, graceful unhandled rejection handling, and SIGTERM listeners.
   - Installed 125 backend dependencies in 22 seconds via `npm.cmd`.

2. **React + Vite Frontend Scaffolding (`client/`):**
   - Initialized `client/package.json` with React 18, Vite 5, Tailwind CSS 3, Lucide React, and React Router v6.
   - Configured `client/vite.config.js` with API proxy forwarding `/api` to `http://localhost:5000`.
   - Configured `client/tailwind.config.js` with the approved botanical palette tokens:
     - Forest Green (`#174D32`), Sage Green (`#A8C5A0`), Off-White (`#F8FAF6`), Pure White (`#FFFFFF`), Charcoal (`#1F2937`).
   - Configured `client/src/index.css` with Inter font import, base styling, and botanical scrollbars.
   - Built reusable atomic UI components:
     - `Button.jsx` (Primary, Secondary/Sage, Outline, Ghost, Danger variants with loading spinners).
     - `Input.jsx` (Labeled inputs with botanical focus rings and validation error messaging).
     - `Card.jsx` (White elevation surface with soft botanical borders).
     - `Badge.jsx` (Status indicator pills for care and system states).
     - `Loader.jsx` (Sprout-centered botanical loading spinner).
   - Created navigation and layouts:
     - `Navbar.jsx` (Botanical logo, navigation links, cart pill, user triggers, responsive mobile drawer).
     - `Footer.jsx` (Guarantee banners, navigation columns, copyright attribution for Rifat Bin Alam).
     - `PublicLayout.jsx` (Root layout mounting Navbar, Outlet, Footer, and Dev Inspector Badge).
   - Built initial views:
     - `HomePage.jsx` (Hero with high-res plant visual, architectural capability cards, and metrics bar).
     - `NotFoundPage.jsx` (Accessible 404 view with return link).
   - Implemented `DevInspectorBadge.jsx` (Development-only route, component, and subcomponent floating inspector with production tree-shaking guard).
   - Compiled client bundle via `npm.cmd run build` in 3.62s (0 errors).

3. **Automated Verification:**
   - Started backend server on `http://localhost:5000`.
   - Verified `GET /api/health` returned HTTP 200 with operational backend health and uptime.
   - Verified `GET /` returned HTTP 200 with API metadata.
   - Verified `GET /api/non-existent` returned HTTP 404 with structured JSON error payload.
   - Successfully terminated test server process.

4. **Status & Next Step:**
   - Phase 1 verified and complete. Ready for student review before commencing Phase 2.

## 📅 Log Entry: 2026-11-02 — Phase 2A: Public Homepage, About, Contact & Navigation

### Strategy Change
- Adopted **frontend-first development** approach: completing all UI with realistic mock data before integrating backend/database.
- MongoDB Atlas, real authentication, payment integration, and backend business logic are postponed.
- Mock data files use field names matching the planned MongoDB schema for seamless future integration.

### Summary of Implementation Actions:

1. **Mock Data Layer (`client/src/data/`):**
   - Created `mockProducts.js` with 12 realistic botanical products including prices in BDT (৳), care levels, sunlight/watering requirements, categories, ratings, reviews, tags, and stock status.
   - Created `mockServices.js` with 6 gardening services including categories, durations, pricing, includes lists, and ratings.
   - Created `mockTestimonials.js` with 4 customer testimonials, platform statistics, and 3-step "How It Works" explainer data.
   - All mock data exports helper functions (`getPopularProducts`, `getFeaturedProduct`, `getPopularServices`) for component consumption.

2. **New Reusable Components (`client/src/components/common/`):**
   - `ProductCard.jsx` — Full-featured product display card with image hover effect, discount percentage badge, category badge, wishlist heart button, star rating, price in BDT with strikethrough for discounts, care level badge, sunlight/watering quick-stats, and Add to Cart button. Supports `compact` mode for tighter layouts.
   - `ServiceCard.jsx` — Service display card with image, gradient overlay, category and duration badges, rating, truncated description, includes preview list, pricing, and View Details button. Supports `compact` mode.
   - `TestimonialCard.jsx` — Customer review card with 5-star rating display, italic quote text, decorative quote icon, avatar initials circle, reviewer name/role, and plant count badge.

3. **Enhanced HomePage (`pages/public/HomePage.jsx`):**
   - **Section 1:** Hero banner with featured product card (dynamically pulled from mock data), call-to-action buttons, trust indicators.
   - **Section 2:** "How It Works" — 3-step visual explainer with numbered icons and connector arrows.
   - **Section 3:** "Most Loved Botanicals" — Grid of 4 popular products using `ProductCard` component with link to full shop.
   - **Section 4:** "Architectural Capabilities" — 4-card feature grid (Botanical E-Commerce, On-Demand Horticulturists, My Plants Journal, Gemini AI Plant Doctor).
   - **Section 5:** "Professional Gardening Services" — Preview of 3 popular services using `ServiceCard` with sage background section.
   - **Section 6:** "Loved by Plant Parents" — 4-column testimonial grid using `TestimonialCard`.
   - **Section 7:** Platform statistics bar (200+ plants, 500+ customers, 150+ services, 97% survival rate) with icons.
   - **Section 8:** Call-to-action banner linking to registration and about page.

4. **About Page (`pages/public/AboutPage.jsx`):**
   - Hero section with page title and platform description.
   - Mission & Vision — Two gradient cards with bullet-pointed goals.
   - Core Platform Values — 4-card grid (Botanical Excellence, Trust & Transparency, Community Centered, AI-Powered Care).
   - Developer profile card with initials avatar, IUBAT practicum badge, and bio.
   - Technical Architecture card with 12-item tech stack grid (React 18, Vite 5, Tailwind, Node.js, Express, MongoDB, Mongoose, JWT, Gemini, SSLCommerz, Lucide, Recharts).
   - CTA banner linking to shop and contact page.

5. **Contact Page (`pages/public/ContactPage.jsx`):**
   - Hero section with page title.
   - 4 contact info cards (Email, Phone, Location, Business Hours).
   - Contact form with name, email, subject, and message fields — includes demo submission with 1.5s simulated delay, success toast with "demo mode" disclaimer, and auto-reset.
   - FAQ accordion with 6 questions (plant care, service areas, payments, returns, gardener applications, AI doctor availability) — smooth expand/collapse interaction.
   - CTA banner linking to shop and services.

6. **Navigation Updates:**
   - `Navbar.jsx` — Updated nav links: Home, Shop Plants, Services, About, Contact. Removed My Plants from public navigation (will be in authenticated layout).
   - `App.jsx` — Added routes for `/about` and `/contact`. Clean route organization with comments.
   - `Footer.jsx` — Preserved existing structure (no changes needed).

7. **Dev Inspector Enhancements (`dev/DevInspectorBadge.jsx`):**
   - Added route mappings for `/about` and `/contact` with correct page, title, layout, subcomponents, and data file references.
   - Added "Title" field to the compact inspector view.
   - Added "Data / API Files" section in expanded view with amber-styled tags for mock data file references.
   - Improved fallback logic for unmatched routes (handles `/shop/:slug` and `/services/:slug` prefixes).

8. **Build & Verification:**
   - `npm run build` — ✓ 1,585 modules transformed in 7.38s with 0 errors.
   - `npm run dev` — ✓ VITE v5.4.21 ready in 617ms on `http://localhost:5173/`.
   - All three new pages accessible at `/`, `/about`, `/contact`.
   - 404 catch-all still functioning for undefined routes.

### Files Created:
- `client/src/data/mockProducts.js`
- `client/src/data/mockServices.js`
- `client/src/data/mockTestimonials.js`
- `client/src/components/common/ProductCard.jsx`
- `client/src/components/common/ServiceCard.jsx`
- `client/src/components/common/TestimonialCard.jsx`
- `client/src/pages/public/AboutPage.jsx`
- `client/src/pages/public/ContactPage.jsx`

### Files Modified:
- `client/src/pages/public/HomePage.jsx` (complete rewrite with 8 sections)
- `client/src/App.jsx` (added About and Contact routes)
- `client/src/components/navigation/Navbar.jsx` (updated nav links)
- `client/src/dev/DevInspectorBadge.jsx` (enhanced route mappings, title, data files)

### Status & Next Step:
Phase 2A verified and complete.

---

## 📅 Log Entry: 2026-11-12 — Phase 2: Frontend UI Refinement & Simplification (Complete UI Suite)

### Objective:
Refine the existing frontend UI to make it look professional, clean, modern, and visually consistent with the approved botanical aesthetic (Forest Green `#174D32`, Sage Green `#A8C5A0`, Off-White `#F8FAF6`). Provide clean, beginner-friendly, and maintainable code with native React Context state that can be easily demonstrated and explained during university practicum defense.

### Summary of Implementation Actions:

1. **Centralized Interactive State Layer (`client/src/context/AppContext.jsx`):**
   - Built unified, beginner-friendly `AppContext` with native React hooks (`createContext`, `useContext`, `useState`, `useEffect`).
   - Implemented state management for:
     - `currentUser`: Seamless role switching between **Customer**, **Gardener**, and **Administrator** with instant sync to UI.
     - `cart`: Add to cart, quantity increments/decrements, item removal, clear cart, subtotal, and dynamic delivery fee calculation.
     - `products`: Product catalog initialized from `mockProducts.js` with live inventory stock adjustments.
     - `orders`: Order history initialized from mock data with live order placement and fulfillment status updates (`pending`, `confirmed`, `dispatched`, `delivered`).
     - `bookings`: Gardening service appointments initialized from mock data with interactive booking scheduling and Gardener accept/reject workflow.
     - `personalPlants`: Customer plant care journal with dynamic watering schedules, overdue alerts, and 1-click "Mark Watered" action.
     - `toast`: Lightweight toast notification system for feedback (success, info, warning) without third-party dependencies.

2. **Florva AI Botanical Assistant (`client/src/components/common/PlantChatbot.jsx`):**
   - Created floating sticky button with sprout icon on customer views: "Ask Florva AI".
   - Implemented slide-out botanical drawer with quick prompt chips:
     - "Why are my Monstera leaves turning yellow?"
     - "Best low-light indoor plants for apartments?"
     - "How often should I water my Snake Plant?"
     - "What soil mix is best for Aroid plants?"
   - Features botanical avatar, message bubbles, timestamp, typing indicator, and responsive input field.

3. **Customer Shop & Catalog Experience:**
   - `ShopPage.jsx`: Filter by category (Indoor, Outdoor, Flowering, Succulents, Air Purifying), care difficulty (Beginner, Intermediate, Advanced), live search bar, sort dropdown (Price Low-to-High, High-to-Low, Rating, Newest), active filter badges, and botanical empty states.
   - `ProductDetailPage.jsx`: High-resolution product image gallery, stock availability badge, BDT pricing with discount strike-through, botanical care specifications (Sunlight, Watering, Humidity, Pet Safe), quantity selector, Add to Cart button, "Adopt to My Plants" shortcut, and tabbed botanical care guide.

4. **Gardening Services & Appointment Booking:**
   - `ServicesPage.jsx`: Service catalog categorized by Garden Care, Landscaping, Pest Control, and Consultation, with a 3-step appointment workflow guide.
   - `ServiceDetailPage.jsx`: Detailed service breakdown, inclusions checklist, duration badge, pricing, and interactive booking appointment form (date picker, time slot selector, street address, special notes, and instant confirmation receipt).

5. **E-Commerce Checkout Flow:**
   - `CartPage.jsx`: Interactive cart table with quantity adjusters (+/-), item removal, price calculations in BDT, free shipping threshold indicator (over ৳2,000), promo code mock input, and checkout button.
   - `CheckoutPage.jsx`: Shipping address form, sandbox payment selection (SSLCommerz Sandbox with bKash/Nagad/Cards or Stripe Sandbox), order summary review, and order confirmation receipt screen with unique tracking order ID.

6. **Customer My Plants Care Journal (`MyPlantsPage.jsx`):**
   - Personal plant care dashboard displaying active plants with dynamic watering countdowns.
   - Highlights "Needs Water Today" alert badge with a single-click "Water Plant" button that resets the care timer.
   - "+ Add Plant to Journal" modal form allowing customers to add custom indoor/outdoor plants.
   - Integrated "My Orders" tab with status badges and "My Service Bookings" tab with appointment schedules.

7. **Gardener Operational Portal (`GardenerDashboardPage.jsx`):**
   - Operational dashboard strictly aligned with Proposal.pdf responsibilities:
     - Top KPI cards: Monthly Revenue (BDT), Active Bookings, Low Stock Alerts, Total Products.
     - Monthly Sales SVG bar chart.
     - Inventory Management Table with quick stock increment/decrement buttons and low stock alerts.
     - Service Bookings management with Accept / Reject (with cancellation reason) modal.
     - Customer Order fulfillment table with status progression dropdowns.

8. **Administrator Governance Portal (`AdminDashboardPage.jsx`):**
   - Administrative portal strictly aligned with Proposal.pdf responsibilities:
     - Top KPI cards: Gross Merchandise Value (BDT), Registered Users, Total Orders, Active Services.
     - User Management Table with account status toggle (Active / Suspended) and role badges.
     - Catalog & Category governance tab.
     - Sandbox Payment Audit Log with authoritative gateway transaction reference codes.

9. **Practicum Authentication Suite:**
   - `LoginPage.jsx`: Clean email/password form plus 1-click **Practicum Quick-Login** buttons for instant demonstration of Customer, Gardener, and Administrator accounts.
   - `RegisterPage.jsx`: Registration form with full name, email, phone, and role selection.

10. **Navigation & Developer Experience:**
    - `Navbar.jsx`: Refined with brand logo, nav links, dynamic cart badge, mobile drawer, and 1-click demonstration role switcher.
    - `DevInspectorBadge.jsx`: Updated route mappings for all new customer, operational, and admin routes.
    - `App.jsx`: Full routing tree configured, wrapped with `<AppProvider>`.

### Verification & Build Audit:
- Executed `cd client; npm.cmd run build` — compiled 1,598 modules in 5.67s with **0 errors and 0 warnings**.
- Verified all routes: `/`, `/shop`, `/shop/:slug`, `/services`, `/services/:slug`, `/cart`, `/checkout`, `/my-plants`, `/gardener`, `/admin`, `/login`, `/register`, `/about`, `/contact`.
- Preserved strict privacy standards: zero occurrences of student ID or supervisor name.

---
