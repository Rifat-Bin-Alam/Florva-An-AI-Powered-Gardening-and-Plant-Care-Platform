# FLORVA — SYSTEM ARCHITECTURE SPECIFICATION (REVISED & REFINED)

**Academic Practicum Project**  
**Student Name:** Rifat Bin Alam  
**Institution:** International University of Business Agriculture and Technology (IUBAT)  

---

## 1. High-Level System Architecture

Florva follows a modern decoupled **Three-Tier Architecture** comprised of the Presentation Tier (React SPA with Vite), Application Logic Tier (Node.js & Express REST API), and Data Tier (MongoDB Atlas Cloud). External micro-integrations handle Generative AI processing (Google Gemini API) and financial sandbox verification with strict server-side validation (SSLCommerz Sandbox with Stripe fallback).

```
                                  +------------------------------------------+
                                  |            CLIENT APPLICATION            |
                                  |       React 18 + Vite SPA Client         |
                                  |    (Tailwind CSS, Inter, Lucide, Recharts)|
                                  +--------------------+---------------------+
                                                       |
                                           HTTPS / REST JSON APIs
                                           JWT Bearer Header
                                                       |
                                                       v
                                  +--------------------+---------------------+
                                  |             API GATEWAY                  |
                                  |      Express.js Server Application       |
                                  |  (CORS, Helmet, RateLimiter, ErrorHandler)|
                                  +--------------------+---------------------+
                                                       |
                   +-----------------------------------+-----------------------------------+
                   |                                   |                                   |
                   v                                   v                                   v
+------------------+-----------------+  +--------------+---------------+  +----------------+----------------+
|       AUTHENTICATION & USERS       |  |     COMMERCE & SERVICES      |  |    PLANTS & AI ASSISTANT        |
| - JWT Token Verification           |  | - Products Catalog & Stock   |  | - "My Plants" Care Engine       |
| - Role Authorization (RBAC)        |  | - Service Appointments Engine|  | - Daily In-App Care Reminders   |
| - Profile & Account Security       |  | - Orders & Cart Processing   |  | - Gemini AI Chatbot Isolation   |
+------------------+-----------------+  +--------------+---------------+  +----------------+----------------+
                   |                                   |                                   |
                   |                                   |                                   |
                   v                                   v                                   v
+------------------+-----------------+  +--------------+---------------+  +----------------+----------------+
|          DATABASE TIER             |  |      AUTHORITATIVE PAYMENTS  |  |     AI GENERATIVE ENGINE       |
|       MongoDB Atlas Cloud          |  |       SSLCommerz Sandbox     |  |      Google Gemini API         |
|  - Users & Categories              |  |   (With Stripe Fallback)     |  |  - Botanical System Prompt     |
|  - Products & Services             |  |  - Server-to-Server Validate |  |  - Isolated Chat Sessions      |
|  - Orders (Price Snapshots)        |  |  - Immutable IPN Webhook     |  |  - Care Diagnostics & Recs     |
|  - Bookings (Price Snapshots)      |  |  - Zero Frontend PaymentTrust|  |                                |
+------------------------------------+  +------------------------------+  +---------------------------------+
```

---

## 2. Authentication & Strict Role-Based Access Control (RBAC)

Florva employs a stateless **JSON Web Token (JWT)** security architecture with strict functional separation between the Gardener and Administrator roles in accordance with `Proposal.pdf`.

### 2.1 Role Boundaries
```
                              ┌────────────────────────┐
                              │      FLORVA SYSTEM     │
                              └───────────┬────────────┘
                                          │
             ┌────────────────────────────┼───────────────────────────┐
             ▼                            ▼                           ▼
     ┌───────────────┐           ┌─────────────────┐         ┌─────────────────┐
     │   CUSTOMER    │           │    GARDENER     │         │  ADMINISTRATOR  │
     │  (End-User)   │           │  (Operations)   │         │  (Governance)   │
     └───────┬───────┘           └────────┬────────┘         └────────┬────────┘
             │                            │                           │
    • Shop & Service Catalog     • Full Product & Stock CRUD • User Account Governance
    • Sandbox Checkout & Orders  • Service Catalog Management• Category & Taxonomy CRUD
    • "My Plants" Care Journal   • Availability & Calendar   • Read Oversight of Orders
    • In-App Care Reminders      • Accept/Reject Bookings    • Read Oversight of Bookings
    • Gemini AI Botanical Chat   • Process & Dispatch Orders • Payment & Audit Logs Monitor
                                 • Operational Sales Charts  • Platform Revenue & Health
```

### 2.2 Route Guard Middleware Pipeline
```
[Inbound Request]
       │
       ▼
[authMiddleware.protect] ──(Fails)──> 401 Unauthorized (Missing / Expired Token)
       │ (Passes: req.user populated)
       ▼
[roleMiddleware.authorizeRoles('gardener')] ──(Fails)──> 403 Forbidden (Insufficient Role)
       │ (Passes: Verified Role)
       ▼
[Controller Action Handled]
```

---

## 3. Authoritative Sandbox Payment Architecture (Zero Client Trust)

The payment flow guarantees that an order cannot be created or confirmed based solely on a frontend message.

```
Customer Browser                     Express API (Florva)                 Payment Gateway (SSLCommerz)
       │                                       │                                         │
       │─── 1. POST /api/payments/initiate ───>│                                         │
       │       { cartItems, address }          │─── 2. Fetch Unit Prices from DB         │
       │                                       │─── 3. Verify Product Inventory          │
       │                                       │─── 4. Compute Subtotal & Shipping       │
       │                                       │─── 5. Create Order in DB:               │
       │                                       │       status: 'pending'                 │
       │                                       │       paymentStatus: 'unpaid'           │
       │                                       │       items: [Snapshot with unit price] │
       │                                       │─── 6. Initiate Gateway Session ────────>│
       │                                       │<── 7. Return Gateway URL & SessionKey ──│
       │<── 8. Redirect Customer to Gateway ───│                                         │
       │                                       │                                         │
[Customer selects bKash / Card in Sandbox]     │                                         │
       │                                       │                                         │
       │───────────────────────────────────────┼─── 9. Submit Sandbox Payment ──────────>│
       │                                       │                                         │
       │                                       │<── 10. Authoritative Server IPN Callback│
       │                                       │        POST /api/payments/sslcommerz/ipn│
       │                                       │        { val_id, tran_id, amount }      │
       │                                       │                                         │
       │                                       │─── 11. Call Gateway Validation API ────>│
       │                                       │        GET /validator/api/validationserver
       │                                       │<── 12. Response: status = "VALID" ──────│
       │                                       │                                         │
       │                                       │─── 13. Validate Amount & Currency Match │
       │                                       │─── 14. Update Order:                    │
       │                                       │        orderStatus = 'confirmed'        │
       │                                       │        paymentStatus = 'paid'           │
       │                                       │─── 15. Decrement Product Stock in DB    │
       │                                       │                                         │
       │<── 16. Redirect to Success Page ──────│                                         │
       │        /order-success/:orderNumber    │                                         │
```

---

## 4. Key Operational Lifecycles

### 4.1 Gardening Service Booking Lifecycle
```
Customer                        Server                       Gardener                       Database
   │                               │                            │                              │
   │─── 1. Select Service, ───────>│                            │                              │
   │    Date, & Time Slot          │─── 2. Freeze Service ────────────────────────────────────>│
   │                               │       Price & Title into Snapshot                         │
   │                               │─── 3. Save Booking (Status: "Pending") ──────────────────>│
   │<── 4. Booking Confirmation ───│                            │                              │
   │                               │                            │                              │
   │                               │                            │─── 5. Fetch Pending ────────>│
   │                               │                            │<── 6. Return Request List ───│
   │                               │                            │                              │
   │                               │<── 7. Accept OR Reject ────│                              │
   │                               │       (Mandatory Reason)   │                              │
   │                               │─── 8. Update Booking ────────────────────────────────────>│
   │                               │       Status in Database                                  │
   │<── 9. View Status in ─────────│                            │                              │
   │    Customer Bookings Portal   │                            │                              │
```

### 4.2 "My Plants" Care Scheduling Algorithm
The personal plant management engine calculates care requirements dynamically:

$$\text{nextWateringDate} = \text{lastWateredDate} + \text{wateringIntervalDays}$$
$$\text{nextFertilizingDate} = \text{lastFertilizedDate} + \text{fertilizingIntervalDays}$$

- **Status Evaluations:**
  - If $\text{currentDate} > \text{nextWateringDate}$: Flagged as **Overdue** (`#D32F2F`)
  - If $\text{currentDate} = \text{nextWateringDate}$: Flagged as **Due Today** (`#ED6C02`)
  - If $\text{currentDate} < \text{nextWateringDate}$: Flagged as **Healthy** (`#174D32`, showing "Water in $X$ days")

Logging a care activity (`POST /care-action`) performs an atomic operation:
1. Updates `lastWateredDate` to current timestamp.
2. Recalculates `nextWateringDate`.
3. Appends an entry into `PlantCareLog` collection.

---

## 5. Google Gemini AI Botanical Assistant Pipeline & Session Isolation

```
Customer                        Chat Component (Client)          Chat Controller            Gemini API
   │                                       │                            │                        │
   │─── 1. Ask Plant Care Question ───────>│                            │                        │
   │                                       │─── 2. POST /chat/message ─>│                        │
   │                                       │       { sessionId, text }  │                        │
   │                                       │                            │─── 3. Verify Customer  │
   │                                       │                            │       Session Ownership│
   │                                       │                            │─── 4. Query Previous   │
   │                                       │                            │       Messages in DB   │
   │                                       │                            │                        │
   │                                       │                            │─── 5. Assemble Prompt  │
   │                                       │                            │       [Persona System  │
   │                                       │                            │        Instruction +   │
   │                                       │                            │        Isolated History│
   │                                       │                            │        + New Query] ──>│
   │                                       │                            │<── 6. Return Advice ───│
   │                                       │                            │                        │
   │                                       │                            │─── 7. Save Bot Message │
   │                                       │                            │       to Database      │
   │                                       │<── 8. Return Formatted Msg─│                        │
   │<── 9. Render Advice in Drawer ────────│                            │                        │
```

---

## 6. In-Browser Development Route & Component Inspector Badge

To facilitate clear defense demonstration and evaluation:

```
+-------------------------------------------------------------------------------+
|  BROWSER VIEWPORT                                                             |
|                                                                               |
|   [Active Page View: Shop Catalog Grid]                                       |
|                                                                               |
|  +-------------------------------------------------------------------------+  |
|  | [DEV INSPECTOR] Route: /shop | Component: ShopPage.jsx                  |  |
|  | Subcomponents: ProductGrid.jsx, FilterSidebar.jsx, ProductCard.jsx      |  |
|  +-------------------------------------------------------------------------+  |
+-------------------------------------------------------------------------------+
```

- **Safety Guarantee:** Automatically tree-shaken and rendered as `null` when `import.meta.env.DEV === false`.
