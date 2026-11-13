# FLORVA — MASTER PROJECT PLAN (REVISED & REFINED)

**Academic Practicum Project**  
**Student Name:** Rifat Bin Alam  
**Institution:** International University of Business Agriculture and Technology (IUBAT)  
**Department:** Department of Computer Science and Engineering  
**Development Timeline:** 3–4 Months (14 Weeks)  
**Primary Specification Reference:** `Proposal.pdf`

---

## 1. Complete System Architecture

Florva is structured as a decoupled, multi-tier client-server web application utilizing the **MERN** stack (MongoDB Atlas, Express.js, React.js, Node.js) with specialized micro-integrations for Artificial Intelligence (Google Gemini Generative AI) and Financial Transactions (Sandbox Payment Engine with authoritative server-side validation).

```
+---------------------------------------------------------------------------------------+
|                                    CLIENT TIER                                        |
|  React 18 + Vite SPA | Tailwind CSS | Inter Font | Recharts | Lucide Icons           |
|                                                                                       |
|  +--------------------+  +----------------------+  +-------------------------------+  |
|  | Customer Storefront|  |  Gardener Portal     |  |   Administrator Dashboard     |  |
|  | (Shop, Services,   |  |  (Catalog, Inventory,|  |   (User Governance, Revenue,  |  |
|  | My Plants, Chat)   |  |  Orders, Bookings)   |  |   Platform Health, Audit)     |  |
|  +--------------------+  +----------------------+  +-------------------------------+  |
|                                                                                       |
|  +---------------------------------------------------------------------------------+  |
|  | Context Layer (Auth, Cart, Toast, Chat, In-Browser Dev Component Badge)         |  |
|  +---------------------------------------------------------------------------------+  |
+-------------------------------------------|-------------------------------------------+
                                            | HTTPS / REST (JSON)
                                            | Authorization: Bearer <JWT>
                                            v
+---------------------------------------------------------------------------------------+
|                                    SERVER TIER                                        |
|  Node.js LTS + Express.js RESTful API Framework                                       |
|                                                                                       |
|  +---------------------------------------------------------------------------------+  |
|  | Middleware: CORS, Helmet Security, Rate Limiter, JWT Auth, RBAC Guards, Error  |  |
|  +---------------------------------------------------------------------------------+  |
|                                                                                       |
|  +----------------+  +----------------+  +---------------+  +----------------------+  |
|  | AuthController |  | Product/Service|  | Order/Booking |  | Chat/Analytics       |  |
|  | & User Control |  | Controllers    |  | Controllers   |  | Controllers          |  |
|  +----------------+  +----------------+  +---------------+  +----------------------+  |
|           |                   |                  |                     |              |
|           v                   v                  v                     v              |
|  +---------------------------------------------------------------------------------+  |
|  | Service Layer: Botanical Gemini Service | Payment Verification Engine | Care    |  |
|  +---------------------------------------------------------------------------------+  |
+-------------------|------------------------------|---------------------|--------------+
                    | Mongoose ODM                 | Authoritative IPN   | API Key
                    v                              v                     v
+--------------------------+          +--------------------+   +-----------------------+
|      DATABASE TIER       |          |  PAYMENT GATEWAY   |   |   ARTIFICIAL INTEL.   |
|   MongoDB Atlas Cloud    |          |  SSLCommerz Sandbox|   |   Google Gemini API   |
| (Collections: Users,     |          |  (With Fallback to |   | (Gemini Flash-Lite    |
|  Products, Services,     |          |   Stripe Sandbox)  |   |  Botanical System     |
|  Orders, Bookings,       |          | - Server IPN Check |   |  Prompt & Chat Log)   |
|  Plants, CareLogs, Chats)|          +--------------------+   +-----------------------+
+--------------------------+
```

---

## 2. Payment Sandbox Evaluation & Security Architecture (Bangladesh Context)

### 2.1 Comparative Analysis of Sandbox Payment Options for IUBAT Practicum

| Gateway | Local Relevance (BD) | Test Payment Methods | Developer Experience | Suitability & Limitations for Demonstration |
| :--- | :--- | :--- | :--- | :--- |
| **SSLCommerz Sandbox** *(Recommended)* | **Highest:** Official standard for Bangladeshi e-commerce; recognized across BD universities. | Simulated bKash, Nagad, Rocket, DBBL Nexus, and Bangladeshi Visa/Mastercard test accounts. | High; clear sandbox endpoints, store credentials (`TESTBOX...`), Instant Payment Notification (IPN) webhook. | **Ideal for Defense:** Demonstrates authentic BDT currency and local mobile payment flows. **Limitation:** Redirection-based hosted payment gateway; occasional sandbox latency. |
| **bKash Sandbox API (PGW)** | **High:** Dominant local mobile money method. | Simulated bKash test PIN and OTP. | Moderate; requires manual sandbox merchant registration, token refresh every 60 minutes. | **Limitation:** Only covers bKash mobile money; doesn't support card payments or bank transfers. Higher setup overhead for practicum timeline. |
| **Stripe Sandbox** | **Low domestically** (not supported for live BD bank payouts), but **universally recognized in academia**. | Global test cards (`4242 4242...`), 3D Secure simulation. | Outstanding; in-page Stripe Elements, zero merchant approval needed, 100% uptime. | **Limitation:** Uses USD/international currency context rather than local BDT/bKash, but provides an exceptionally reliable zero-failure fallback. |

### 2.2 Recommendation & Architecture Strategy
- **Primary Recommendation:** **SSLCommerz Sandbox** configured with official test credentials (`STORE_ID: testbox`, `STORE_PASSWD: qwerty`), transacting in Bangladeshi Taka (**BDT**), allowing seamless demonstration of bKash, Nagad, and local card checkout.
- **Fail-Safe Design:** The payment architecture employs a modular **Payment Adapter Pattern** (`server/src/services/paymentService.js`), allowing instant fallback to Stripe Sandbox or simulated offline test cards if external sandbox servers experience downtime during the live university defense.

### 2.3 Strict Authoritative Payment Security (No Frontend Trust)
Under NO circumstances does the backend trust client-submitted payment success messages.

```
Customer Browser                     Express Server (Florva)                 Payment Gateway (SSLCommerz)
       │                                       │                                         │
       │─── 1. Initiate Checkout ─────────────>│                                         │
       │       { cartItems, address }          │─── 2. Calculate Authentic Total from DB │
       │                                       │─── 3. Generate Unique Transaction ID    │
       │                                       │       (e.g., FLV-TXN-202611-XXXX)       │
       │                                       │─── 4. Save Order (status: "pending")    │
       │                                       │─── 5. Request Gateway Session ─────────>│
       │                                       │<── 6. Return Gateway Redirect URL ──────│
       │<── 7. Redirect to Gateway ────────────│                                         │
       │                                       │                                         │
[Customer enters Sandbox bKash / Card on Gateway]                                        │
       │                                       │                                         │
       │───────────────────────────────────────┼─── 8. Process Test Transaction ────────>│
       │                                       │                                         │
       │                                       │<── 9. Authoritative Server IPN Webhook ─│
       │                                       │       (or Server-to-Server Callback)    │
       │                                       │                                         │
       │                                       │─── 10. Query Gateway Validation API ───>│
       │                                       │        GET /validator/api/validationserver
       │                                       │<── 11. Gateway Confirms: "VALID" ───────│
       │                                       │        (Matches Amount, Currency, TXN)  │
       │                                       │                                         │
       │                                       │─── 12. Mark Order as "PAID"             │
       │                                       │─── 13. Decrement Product Inventory      │
       │                                       │                                         │
       │<── 14. Redirect Customer to ──────────│                                         │
       │        /order-success/:orderNumber    │                                         │
```

#### Security Enforcements:
1. **Price Integrity:** Order totals are calculated exclusively from database records; client-provided prices are ignored.
2. **Server-Side Verification:** The order is only marked `confirmed` after the backend verifies the `val_id` and transaction status directly with the gateway's validation server.
3. **Idempotency & Race Protection:** Transaction IDs are indexed as unique; duplicate webhook/IPN invocations cannot trigger multiple inventory decrements.

---

## 3. Strict Role-Based Permissions & Separation (Proposal.pdf Alignment)

To avoid duplication of responsibilities and preserve the original specification from `Proposal.pdf`:

### 3.1 Role Scope Definition
- **Gardener (Operational Specialist):**
  - Manages plant and gardening products (add, edit, update stock, pricing, care specifications).
  - Manages professional gardening service packages (title, pricing, duration, inclusions).
  - Sets and adjusts appointment availability schedules.
  - Accepts or rejects incoming service booking requests (with mandatory customer-facing explanation note).
  - Views assigned customer orders and progresses fulfillment status (`Pending` -> `Confirmed` -> `Shipped` -> `Delivered`).
  - Analyzes personal sales volume, booking completion rates, and monthly revenue performance.
- **Administrator (Governance & Platform Oversight):**
  - Manages customer and gardener user accounts (view, activate, suspend, audit).
  - Manages plant taxonomy and categories (Indoor, Flowering, Succulents, Soils).
  - Platform oversight: Monitored read-only visibility into all products, services, bookings, and customer orders.
  - Monitors financial payment transactions (audit logs, gateway transaction IDs, payment statuses).
  - Analyzes platform-wide gross merchandise value (GMV), customer acquisition trends, and booking outcomes.
- **Customer (End-User):**
  - Browses catalog, places orders, books services, maintains personal plant care journals ("My Plants"), and consults the Gemini botanical chatbot.

### 3.2 Authorization Matrix
| Functionality / Endpoint | Public | Customer | Gardener | Administrator |
| :--- | :---: | :---: | :---: | :---: |
| Browse Shop Catalog & Services | ✅ | ✅ | ✅ | ✅ |
| Account Registration & Login | ✅ | ✅ | ✅ | ✅ |
| Add to Cart & Sandbox Checkout | ❌ | ✅ | ❌ | ❌ |
| Manage "My Plants" Journal & Care Logs | ❌ | ✅ | ❌ | ❌ |
| Consult Gemini Botanical AI Assistant | ❌ | ✅ | ❌ | ❌ |
| Add / Edit / Restock Products | ❌ | ❌ | ✅ | ❌ *(Oversight only)* |
| Add / Edit Gardening Services | ❌ | ❌ | ✅ | ❌ *(Oversight only)* |
| Set Appointment Availability | ❌ | ❌ | ✅ | ❌ |
| Accept / Reject Service Bookings | ❌ | ❌ | ✅ | ❌ |
| Update Order Fulfillment Status | ❌ | ❌ | ✅ | ❌ *(Oversight only)* |
| User Account Governance (Suspend/Activate)| ❌ | ❌ | ❌ | ✅ |
| Manage Plant Categories & Taxonomies | ❌ | ❌ | ❌ | ✅ |
| Financial Transaction Auditing | ❌ | ❌ | ❌ | ✅ |
| Global Platform Analytics & Logs | ❌ | ❌ | ❌ | ✅ |

---

## 4. Database Schema Refinements & Historical Price Preservation

### 4.1 Historical Price Preservation in Orders
To ensure past invoices remain historically accurate regardless of future product price changes or stock updates, the `Order` schema captures an immutable snapshot of each purchased item at checkout:

```javascript
const orderItemSnapshotSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: { type: String, required: true },          // Preserved product name
  botanicalName: { type: String, default: '' },    // Preserved botanical name
  priceAtPurchase: { type: Number, required: true },// Immutable unit price at purchase time
  quantity: { type: Number, required: true, min: 1 },
  totalItemPrice: { type: Number, required: true }, // priceAtPurchase * quantity
  image: { type: String, required: true }          // Preserved snapshot image
}, { _id: false });
```

### 4.2 Historical Price Preservation in Service Bookings
Similarly, when a customer books a service, the service title and price are frozen into the `Booking` document:

```javascript
const bookingSchema = new mongoose.Schema({
  bookingNumber: { type: String, unique: true, required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gardener: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  serviceTitleAtBooking: { type: String, required: true },
  priceAtBooking: { type: Number, required: true },
  scheduledDate: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  serviceAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true }
  },
  notes: { type: String, default: '' },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
    default: 'pending'
  },
  rejectionReason: {
    type: String,
    default: '',
    required: function() { return this.status === 'rejected'; }
  },
  paymentStatus: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' }
}, { timestamps: true });
```

---

## 5. Detailed Visual Design Specifications & Page Mockups

The interface adheres to the approved botanical palette:
- **Forest Green:** `#174D32` (Primary Brand, Primary CTAs, Dark Accents)
- **Sage Green:** `#A8C5A0` (Secondary Accents, Pill Badges, Soft Borders)
- **Off-White:** `#F8FAF6` (Global Canvas Background)
- **Pure White:** `#FFFFFF` (Card Containers, Modals, Input Fields)
- **Dark Charcoal:** `#1F2937` (High-contrast typography)
- **Typography:** **Inter** font family

---

### 5.1 Customer Home Page (`/`)

```
+---------------------------------------------------------------------------------------------------------+
| [NAVBAR]  🌿 FLORVA       Shop   Services   My Plants        [🔍 Search plants...]   [🛒 Cart (2)] [👤 Jane]|
+---------------------------------------------------------------------------------------------------------+
|                                                                                                         |
|  [HERO SECTION: Background Off-White #F8FAF6, Organic Leaf Watermark]                                    |
|                                                                                                         |
|   Cultivate Serenity in Your Living Spaces.                                                             |
|   Premium botanical plants, verified home gardening services, and                                       |
|   intelligent AI-guided plant care tailored for modern living.                                          |
|                                                                                                         |
|   [ Explore Plant Shop -> (#174D32) ]     [ Book Gardening Service (Outline) ]                           |
|                                                                                                         |
|   +--------------------------+  +--------------------------+  +--------------------------+              |
|   | 🪴 100% Healthy Guarantee |  | 👨🌾 Verified Horticulturist|  | 🤖 AI Plant Care Advisor |              |
|   +--------------------------+  +--------------------------+  +--------------------------+              |
|                                                                                                         |
+---------------------------------------------------------------------------------------------------------+
|  FEATURED BOTANICAL SPECIMENS                                               [ View All Products -> ]     |
|                                                                                                         |
|  +--------------------+  +--------------------+  +--------------------+  +--------------------+         |
|  | [Plant Image]      |  | [Plant Image]      |  | [Plant Image]      |  | [Plant Image]      |         |
|  | Monstera Deliciosa |  | Fiddle Leaf Fig    |  | Snake Plant Laurent|  | Peace Lily Sensation|        |
|  | *Monstera deliciosa*|  | *Ficus lyrata*     |  | *Sansevieria trif.*|  | *Spathiphyllum*    |         |
|  | [Easy Care Badge]  |  | [Moderate Badge]   |  | [Indestructible]   |  | [Air Purifier]     |         |
|  | ৳ 1,250            |  | ৳ 1,850            |  | ৳ 650              |  | ৳ 850              |         |
|  | [Add to Cart]      |  | [Add to Cart]      |  | [Add to Cart]      |  | [Add to Cart]      |         |
|  +--------------------+  +--------------------+  +--------------------+  +--------------------+         |
+---------------------------------------------------------------------------------------------------------+
|  PROFESSIONAL GARDENING SERVICES                                                                         |
|                                                                                                         |
|  +-------------------------------+  +-------------------------------+  +-----------------------------+  |
|  | Balcony Garden Setup          |  | Plant Health Doctor Visit     |  | Seasonal Pruning & Repotting|  |
|  | Complete planter layout,      |  | On-site pest, root rot, and   |  | Fresh organic soil blend,   |  |
|  | potting soil & drainage setup.|  | soil nutrient diagnostic visit|  | pruning, and new pot fitting|  |
|  | ⏱ 3 Hours  |  ৳ 3,500         |  | ⏱ 1 Hour  |  ৳ 1,200          |  | ⏱ 2 Hours  |  ৳ 2,000       |  |
|  | [ Book Appointment -> ]       |  | [ Book Appointment -> ]       |  | [ Book Appointment -> ]     |  |
|  +-------------------------------+  +-------------------------------+  +-----------------------------+  |
+---------------------------------------------------------------------------------------------------------+
| [FOOTER: Forest Green #174D32]  Florva Botanical Care | Dhaka, Bangladesh | (c) 2026 Rifat Bin Alam     |
+---------------------------------------------------------------------------------------------------------+
                                                                             | [🌿 Ask Florva AI] (Sticky)|
                                                                             +----------------------------+
```

---

### 5.2 Customer Shop Page (`/shop`)

```
+---------------------------------------------------------------------------------------------------------+
| [NAVBAR]                                                                                                |
+---------------------------------------------------------------------------------------------------------+
| Breadcrumbs: Home / Shop                                                   Showing 12 of 24 plants      |
|                                                                                                         |
| [FILTER SIDEBAR (w-64)]           | [PRODUCT CATALOG GRID (col-span-3)]                                 |
|                                   |                                                                     |
| 🔍 Search Catalog                 | [ Sort: Featured v ]   [ Grid View ]  [ List View ]                 |
| [ Monstera...                   ] |                                                                     |
|                                   | +--------------------+  +--------------------+  +-----------------+ |
| Categories                        | | [Photo]  [In Stock]|  | [Photo]  [In Stock]|  | [Photo] [Low Stk| |
| [x] Indoor Plants (8)             | | Monstera Deliciosa |  | ZZ Plant           |  | Calathea Orbif. | |
| [ ] Flowering Plants (4)          | | *Monstera deliciosa*|  | *Zamioculcas zami.*|  | *Calathea orb.* | |
| [ ] Succulents & Cacti (6)        | | ☀️ Medium Indirect  |  | ☀️ Low to Bright   |  | ☀️ Low / Shade  | |
| [ ] Soils & Fertilizers (3)       | | 💧 Every 7 Days    |  | 💧 Every 14 Days   |  | 💧 Every 4 Days | |
|                                   | | ৳ 1,250            |  | ৳ 950              |  | ৳ 1,400         | |
| Care Level                        | | [Add to Cart]      |  | [Add to Cart]      |  | [Add to Cart]   | |
| (o) All Levels                    | +--------------------+  +--------------------+  +-----------------+ |
| ( ) Easy Care                     |                                                                     |
| ( ) Moderate                      | +--------------------+  +--------------------+  +-----------------+ |
| ( ) Expert                        | | Areca Palm         |  | Rubber Fig         |  | Aloe Vera Spec. | |
|                                   | | ৳ 1,100            |  | ৳ 1,350            |  | ৳ 450           | |
| Price Range (BDT)                 | | [Add to Cart]      |  | [Add to Cart]      |  | [Add to Cart]   | |
| [ ৳ 200 ] ------------ [ ৳ 5000 ] | +--------------------+  +--------------------+  +-----------------+ |
|                                   |                                                                     |
| [ Reset Filters ]                 | [ < Previous ]    [ 1 ]   [ 2 ]   [ Next > ]                        |
+---------------------------------------------------------------------------------------------------------+
| [DEV INSPECTOR] Route: /shop | Component: ShopPage.jsx | Subcomponents: [FilterSidebar, ProductGrid]   |
+---------------------------------------------------------------------------------------------------------+
```

---

### 5.3 Product Details Page (`/shop/:id`)

```
+---------------------------------------------------------------------------------------------------------+
| [NAVBAR]                                                                                                |
+---------------------------------------------------------------------------------------------------------+
| Breadcrumbs: Home / Shop / Indoor Plants / Monstera Deliciosa                                           |
|                                                                                                         |
|  +-----------------------------+   Monstera Deliciosa                                                   |
|  |                             |   *Monstera deliciosa Liebm.*                                          |
|  |                             |   ★★★★★ (18 Verified Reviews)                                         |
|  |     [LARGE HIGH-RES         |                                                                        |
|  |      PLANT PHOTO]           |   ৳ 1,250   (In Stock: 14 units available)                             |
|  |                             |                                                                        |
|  |                             |   The iconic Swiss Cheese Plant known for its glossy, split leaves.    |
|  +-----------------------------+   A stunning natural centerpiece for well-lit interior rooms.          |
|  [Thumb 1] [Thumb 2] [Thumb 3] |                                                                        |
|                                |   BOTANICAL CARE REQUIREMENTS                                          |
|                                |   +-------------------+  +-------------------+  +--------------------+ |
|                                |   | ☀️ Sunlight        |  | 💧 Watering        |  | 🪴 Difficulty      | |
|                                |   | Medium, Indirect  |  | Every 7-9 days    |  | Beginner-Friendly  | |
|                                |   +-------------------+  +-------------------+  +--------------------+ |
|                                |                                                                        |
|                                |   Quantity:  [ - ]  [ 1 ]  [ + ]                                       |
|                                |                                                                        |
|                                |   [ 🛒 Add to Shopping Cart (#174D32) ]     [ ❤️ Add to Wishlist ]     |
|                                |                                                                        |
|                                |   📦 Free Delivery in Uttara on orders over ৳ 2,000                     |
|                                |   🛡️ 7-Day Healthy Plant Guarantee upon delivery                        |
+---------------------------------------------------------------------------------------------------------+
```

---

### 5.4 Customer "My Plants" Journal & AI Assistant (`/my-plants`)

```
+---------------------------------------------------------------------------------------------------------+
| [NAVBAR]                                                                                                |
+---------------------------------------------------------------------------------------------------------+
| 🌿 My Digital Garden                                                     [ + Add New Plant to Journal ] |
| Track personal watering schedules, fertilizing dates, and care history.                                 |
|                                                                                                         |
| CARE REMINDERS FOR TODAY                                                                                |
| +-----------------------------------------------------------------------------------------------------+ |
| | ⚠️ 1 Plant Needs Water Today!                                                                        | |
| | "Monty" (Monstera Deliciosa) is due for watering today.                [ 💧 Mark as Watered Now ]   | |
| +-----------------------------------------------------------------------------------------------------+ |
|                                                                                                         |
| MY PERSONAL PLANTS (3 Specimens Cataloged)                                                              |
|                                                                                                         |
| +-----------------------------+  +-----------------------------+  +-----------------------------+      |
| | [Plant Photo]               |  | [Plant Photo]               |  | [Plant Photo]               |      |
| | "Monty"                     |  | "Ziggy"                     |  | "Lily"                      |      |
| | Monstera Deliciosa          |  | Snake Plant                 |  | Peace Lily                  |      |
| | Location: Living Room East  |  | Location: Bedroom Desk      |  | Location: Shaded Balcony    |      |
| |                             |  |                             |  |                             |      |
| | [! DUE TODAY (Water) !]     |  | [✓ Water in 5 days]         |  | [✓ Water in 2 days]         |      |
| | Last Watered: 7 days ago    |  | Last Watered: 9 days ago    |  | Last Watered: 2 days ago    |      |
| | Next Fertilizer: 12 days    |  | Next Fertilizer: 21 days    |  | Next Fertilizer: 18 days    |      |
| |                             |  |                             |  |                             |      |
| | [💧 Water]  [🌱 Fertilize]   |  | [💧 Water]  [🌱 Fertilize]   |  | [💧 Water]  [🌱 Fertilize]   |      |
| | [📝 View Journal & Notes]   |  | [📝 View Journal & Notes]   |  | [📝 View Journal & Notes]   |      |
| +-----------------------------+  +-----------------------------+  +-----------------------------+      |
|                                                                                                         |
+---------------------------------------------------------------------------------------------------------+
                                                     |                                                    |
                                                     | [SLIDE-OUT AI CHAT DRAWER: Open]                   |
                                                     | +------------------------------------------------+ |
                                                     | | 🌿 Florva Botanical AI Care Assistant       [X]| |
                                                     | +------------------------------------------------+ |
                                                     | | Bot: Hello Jane! I am your Florva Botanical    | |
                                                     | | Specialist. How can I help your plants today?  | |
                                                     | |                                                | |
                                                     | | User: Why are the lower leaves of my monstera  | |
                                                     | | turning pale yellow?                           | |
                                                     | |                                                | |
                                                     | | Bot: Pale yellow lower leaves on a *Monstera*  | |
                                                     | | usually indicate one of two things:            | |
                                                     | | 1. **Overwatering / Wet Soil:** Check if the   | |
                                                     | |    top 2 inches of soil feel soggy.            | |
                                                     | | 2. **Natural Age:** If it's only the oldest    | |
                                                     | |    single bottom leaf, it may just be aging.   | |
                                                     | | Tip: Let the top 50% of soil dry before your   | |
                                                     | | next watering!                                 | |
                                                     | +------------------------------------------------+ |
                                                     | | [ Ask a question about your plant...     ] [>] | |
                                                     | +------------------------------------------------+ |
```

---

### 5.5 Gardener Portal Dashboard (`/gardener`)

```
+---------------------------------------------------------------------------------------------------------+
| [GARDENER HEADER]  🌿 FLORVA GARDENER PORTAL                 Assigned Horticulturist: Md. Rafiq [Logout]|
+---------------------------------------------------------------------------------------------------------+
| [SIDEBAR]             | GARDENER PERFORMANCE OVERVIEW                                                   |
|                       |                                                                                 |
| 📊 Overview           | +------------------+ +------------------+ +------------------+ +--------------+ |
| 🪴 Products & Stock   | | Monthly Sales    | | Active Bookings  | | Orders to Dispatch| | Low Stock    | |
| 🛠️ My Services        | | ৳ 48,500         | | 5 Appointments   | | 3 Orders          | | 2 Products   | |
| 📅 Bookings & Cal     | | (+14% vs Oct)    | | (2 Pending)      | | (1 Confirmed)     | | (< 5 units)  | |
| 📦 Orders Fulfillment | +------------------+ +------------------+ +------------------+ +--------------+ |
|                       |                                                                                 |
|                       | MONTHLY SALES & REVENUE (Recharts Bar & Line Visualization)                     |
|                       | [ BDT 60k ]                                                                     |
|                       | [ BDT 40k ]        ██                                                           |
|                       | [ BDT 20k ]   ██   ██   ██   ██                                                 |
|                       | [  0  BDT ]───Jul──Aug──Sep──Oct──Nov───────────────────────────                |
|                       |                                                                                 |
|                       | UPCOMING SERVICE APPOINTMENTS NEEDING ACTION                                    |
|                       | +-----------------------------------------------------------------------------+ |
|                       | | BKG-202611-001 | Jane Botanist | Balcony Setup | Nov 05, 09:00 AM           | |
|                       | | Address: House 12, Road 4, Sector 10, Uttara | Notes: East balcony          | |
|                       | | Status: [ PENDING ]  ───>  [ ✓ Accept Appointment ]  [ ✕ Reject (Reason) ]  | |
|                       | +-----------------------------------------------------------------------------+ |
|                       | | BKG-202611-002 | Karim Ullah  | Health Check  | Nov 06, 02:00 PM           | |
|                       | | Status: [ ACCEPTED ] ───>  [ Mark Completed ]                               | |
|                       | +-----------------------------------------------------------------------------+ |
|                       |                                                                                 |
|                       | RECENT CUSTOMER ORDERS TO FULFILL                                               |
|                       | +-----------------------------------------------------------------------------+ |
|                       | | ORD-202611-104 | 2x Monstera, 1x Organic Soil Mix | ৳ 2,850                 | |
|                       | | Status: [ Confirmed v ] ──> Change to: [ Shipped ] [ Delivered ]             | |
|                       | +-----------------------------------------------------------------------------+ |
+---------------------------------------------------------------------------------------------------------+
| [DEV INSPECTOR] Route: /gardener | Component: GardenerDashboardPage.jsx | Subcomponents: [SalesChart]   |
+---------------------------------------------------------------------------------------------------------+
```

---

### 5.6 Administrator Dashboard (`/admin`)

```
+---------------------------------------------------------------------------------------------------------+
| [ADMIN HEADER]  🌿 FLORVA SYSTEM ADMINISTRATION                      System Superadmin [Audit Logs]     |
+---------------------------------------------------------------------------------------------------------+
| [ADMIN SIDEBAR]       | SYSTEM PLATFORM GOVERNANCE & ANALYTICS                                          |
|                       |                                                                                 |
| 📈 Global Analytics   | +------------------+ +------------------+ +------------------+ +--------------+ |
| 👥 User Accounts      | | Gross Revenue    | | Total Orders     | | Service Bookings | | Active Users | |
| 🏷️ Plant Categories   | | ৳ 142,300        | | 84 Orders        | | 32 Bookings      | | 128 Accounts | |
| 🪴 Catalog Oversight  | | (All-Time GMV)   | | (94% Fulfillment)| | (85% Completed)  | | (1 Gardener) | |
| 💳 Payment Audit      | +------------------+ +------------------+ +------------------+ +--------------+ |
| 📋 Activity Logs      |                                                                                 |
|                       | REVENUE TRAJECTORY (Recharts Area Chart)  | BOOKING STATUS (Recharts Donut)     |
|                       | [ BDT ]    /----------------              |    ╭──────╮  ■ Completed (24)       |
|                       |          /                                |   │   85%  │ ■ Pending (4)          |
|                       |    /----                                  |    ╰──────╯  ■ Rejected (4)         |
|                       |   Aug    Sep    Oct    Nov                |                                     |
|                       |                                                                                 |
|                       | USER ACCOUNT GOVERNANCE & ACCESS CONTROL                                        |
|                       | +-----------------------------------------------------------------------------+ |
|                       | | Name           | Email                 | Role     | Status   | Actions      | |
|                       | | Jane Botanist  | jane@example.com      | Customer | Active   | [Suspend]    | |
|                       | | Md. Rafiq      | gardener@florva.com   | Gardener | Active   | [Inspect]    | |
|                       | | Admin Root     | admin@florva.com      | Admin    | Active   | [Protected]  | |
|                       | +-----------------------------------------------------------------------------+ |
|                       |                                                                                 |
|                       | RECENT TRANSACTION AUDIT LOGS (SSLCommerz Sandbox)                             |
|                       | +-----------------------------------------------------------------------------+ |
|                       | | TXN ID          | Customer      | Method   | Amount   | Status              | |
|                       | | FLV-TXN-2611-89 | Jane Botanist | bKash    | ৳ 2,550  | [✓ VALIDATED / PAID]| |
|                       | | FLV-TXN-2611-88 | Karim Ullah   | Visa BD  | ৳ 1,200  | [✓ VALIDATED / PAID]| |
|                       | +-----------------------------------------------------------------------------+ |
+---------------------------------------------------------------------------------------------------------+
| [DEV INSPECTOR] Route: /admin | Component: AdminDashboardPage.jsx | Subcomponents: [DonutChart, Users] |
+---------------------------------------------------------------------------------------------------------+
```

---

## 6. Scope Management & 3–4 Month Delivery Safeguards

To prevent scope creep and guarantee that Florva is completed with university practicum distinction within 14 weeks:

### Features Retained & Prioritized (Core Requirements from `Proposal.pdf`):
- Secure Authentication & Strict Role-Based Access (Customer, Gardener, Admin).
- Full Botanical Catalog with Search, Category Filters, and Botanical Care Specs.
- Gardener Product, Service, Availability, and Booking Acceptance/Rejection workflows.
- Customer Cart, Authoritative Sandbox Payment Verification, and Order Tracking.
- Customer "My Plants" Journal with dynamic watering/fertilizing calculation and in-app reminder alerts.
- Isolated Gemini AI Botanical Assistant with private per-customer chat threads.
- Comprehensive Gardener & Administrator Recharts Dashboards.
- In-Browser Development Route & Component Inspector Badge.

### Features Intentionally Excluded (Avoid Scope Bloat):
- Multi-vendor marketplace logic (Florva has 1 Gardener and 1 Administrator as specified in Proposal).
- Heavy native SMS gateways (In-app notification banners and care reminder lists satisfy all reminder criteria reliably without paid carrier dependencies).
- Multi-currency conversions (Strict focus on Bangladeshi Taka **BDT**).

---

## 7. Step-by-Step Implementation Sequence

```
[Phase 0: Planning & Architectural Specification] (COMPLETED & REFINED)
        │
        ▼
[Phase 1: Project Scaffolding & Foundation]
├── Initialize client/ (Vite + Tailwind + Inter + Lucide)
├── Initialize server/ (Express + MongoDB connection + Error Handler)
└── Implement In-Browser Dev Route & Component Inspector Badge
        │
        ▼
[Phase 2: Authentication & Role-Based Access Control]
├── User Schema, JWT utils, bcryptjs, Auth Middleware
├── Auth REST API (Register, Login, Me, Profile)
└── Frontend AuthContext, Login & Register Views, Role Guards
        │
        ▼
[Phase 3: Category & Product Management]
├── Category & Product Schemas (with botanical care attributes)
├── Gardener Product Management API & Frontend CRUD
└── Public Product Storefront (Search, Filtering by category & care level)
        │
        ▼
[Phase 4: Gardening Services & Appointment Booking Engine]
├── Service & Booking Schemas (with frozen service pricing)
├── Gardener Service Management API & Public Service Catalog
└── Booking Request Flow with Date/Slot Picker & Gardener Acceptance/Rejection
        │
        ▼
[Phase 5: Shopping Cart, Authoritative Sandbox Payments & Orders]
├── Cart Context & Cart Management UI
├── SSLCommerz Sandbox Integration & Server-to-Server Validation (with Stripe fallback)
└── Order Lifecycle Processing (Immutable price snapshots & stock decrement)
        │
        ▼
[Phase 6: "My Plants" Care Journal & Dynamic Reminders Engine]
├── PersonalPlant & PlantCareLog Schemas
├── Dynamic Care Schedule Calculation (Next water/fertilize due dates)
└── My Plants Dashboard & In-App Care Alerts ("Water Today" action)
        │
        ▼
[Phase 7: Google Gemini AI Botanical Assistant]
├── ChatSession & ChatMessage Schemas (Isolated per customer)
├── Gemini API Integration with Botanical Persona System Prompt
└── Floating Customer AI Button & Slide-Out Drawer Interface
        │
        ▼
[Phase 8: Gardener & Administrator Analytics Dashboards]
├── Gardener Performance Analytics & Order/Booking Management Views
├── Admin Platform Governance (Users, Categories, Global Revenue, Audit)
└── Recharts Visualizations for Monthly Revenue & Booking Trends
        │
        ▼
[Phase 9: Comprehensive Testing, Documentation Update & Practicum Defense Prep]
```
