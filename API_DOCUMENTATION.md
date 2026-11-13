# FLORVA — REST API SPECIFICATION (REVISED & REFINED)

**Academic Practicum Project**  
**Student Name:** Rifat Bin Alam  
**Institution:** International University of Business Agriculture and Technology (IUBAT)  

---

## 1. Global API Standards

- **Base URL:** `http://localhost:5000/api`
- **Exchange Format:** `application/json`
- **Authentication Scheme:** `Authorization: Bearer <JWT_TOKEN>`

### Standard Success Response Envelope
```json
{
  "success": true,
  "message": "Resource retrieved successfully",
  "data": { ... }
}
```

### Standard Error Response Envelope
```json
{
  "success": false,
  "message": "Validation failed",
  "error": "Detailed error string",
  "stack": null // Included only when NODE_ENV === 'development'
}
```

---

## 2. API Endpoints by Domain

### 2.1 Authentication & User Management (`/api/auth`, `/api/users`)

#### `POST /api/auth/register`
- **Access:** Public
- **Description:** Registers a new Customer account.
- **Request Body:**
  ```json
  {
    "name": "Jane Botanist",
    "email": "jane@example.com",
    "password": "Password123!",
    "phone": "+8801711223344"
  }
  ```
- **Response `201 Created`:** Returns JWT and sanitized user profile.

#### `POST /api/auth/login`
- **Access:** Public
- **Description:** Authenticates credentials and returns JWT token with role.

#### `GET /api/auth/me`
- **Access:** Protected (Any valid token)
- **Description:** Returns profile details of active user.

#### `PUT /api/auth/profile`
- **Access:** Protected (Any valid token)
- **Description:** Updates name, phone, or address.

#### `GET /api/users`
- **Access:** Protected (Administrator Only)
- **Description:** Searchable and paginated directory of customer and gardener accounts.

#### `PUT /api/users/:id/status`
- **Access:** Protected (Administrator Only)
- **Request Body:** `{ "isActive": false }`
- **Description:** Suspend or reactivate user accounts.

---

### 2.2 Categories & Plant Taxonomy (`/api/categories`)

#### `GET /api/categories`
- **Access:** Public
- **Description:** Returns all plant categories.

#### `POST /api/categories`
- **Access:** Protected (Administrator Only)
- **Description:** Create a new plant category.

#### `PUT /api/categories/:id`
- **Access:** Protected (Administrator Only)
- **Description:** Edit category information or cover image.

---

### 2.3 Gardening Products & Inventory (`/api/products`)

#### `GET /api/products`
- **Access:** Public
- **Query Params:** `search`, `category`, `careLevel` (`easy` | `moderate` | `expert`), `minPrice`, `maxPrice`, `sort`.
- **Description:** Browsable and filterable plant catalog.

#### `GET /api/products/:id`
- **Access:** Public
- **Description:** Product details with scientific care specifications.

#### `POST /api/products`
- **Access:** Protected (Gardener Only)
- **Description:** Add a new botanical product to the catalog.

#### `PUT /api/products/:id`
- **Access:** Protected (Gardener Only)
- **Description:** Modify product pricing, care details, or update inventory stock.

#### `DELETE /api/products/:id`
- **Access:** Protected (Gardener Only)
- **Description:** Soft-delete/deactivate a product.

---

### 2.4 Gardening Services & Appointments (`/api/services`, `/api/bookings`)

#### `GET /api/services`
- **Access:** Public
- **Description:** List published gardening service packages.

#### `POST /api/services`
- **Access:** Protected (Gardener Only)
- **Description:** Create a new gardening service package.

#### `PUT /api/services/:id`
- **Access:** Protected (Gardener Only)
- **Description:** Edit service pricing, duration, or inclusions.

#### `POST /api/bookings`
- **Access:** Protected (Customer Only)
- **Description:** Book an appointment with date and time slot.

#### `GET /api/bookings/my`
- **Access:** Protected (Customer Only)
- **Description:** Retrieve customer's personal booking requests.

#### `GET /api/bookings/gardener`
- **Access:** Protected (Gardener Only)
- **Description:** Retrieve all appointment requests assigned to gardener.

#### `PUT /api/bookings/:id/status`
- **Access:** Protected (Gardener Only)
- **Request Body:**
  ```json
  {
    "status": "rejected",
    "rejectionReason": "Slot unavailable due to emergency maintenance."
  }
  ```
- **Description:** Accept, reject (with mandatory reason), or mark booking completed.

#### `GET /api/bookings/admin`
- **Access:** Protected (Administrator Only — Read-Only Oversight)
- **Description:** Platform-wide appointment oversight.

---

### 2.5 Authoritative Orders & Payments (`/api/orders`, `/api/payments`)

#### `POST /api/payments/initiate`
- **Access:** Protected (Customer Only)
- **Request Body:**
  ```json
  {
    "items": [{ "productId": "64a0f789...", "quantity": 2 }],
    "shippingAddress": {
      "fullName": "Jane Botanist",
      "phone": "+8801711223344",
      "street": "Road 4, Sector 10",
      "city": "Dhaka",
      "zipCode": "1230"
    }
  }
  ```
- **Workflow:**
  1. Backend fetches current unit prices directly from MongoDB (client prices ignored).
  2. Creates `Order` with `orderStatus: 'pending'` and `paymentInfo.status: 'pending'`.
  3. Initiates SSLCommerz Sandbox session with unique `tran_id`.
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "gatewayUrl": "https://sandbox.sslcommerz.com/gwprocess/v4/gw.php?Q=...",
    "transactionId": "FLV-TXN-202611-0089",
    "orderNumber": "FLV-ORD-202611-0104"
  }
  ```

#### `POST /api/payments/sslcommerz/ipn`
- **Access:** Gateway Webhook (Verified Server-to-Server)
- **Payload:** `{ val_id, tran_id, amount, card_type, status }`
- **Security Check:**
  1. Backend contacts SSLCommerz Validation API with `val_id` and store credentials.
  2. If gateway responds `status: 'VALID'` and verified amount matches order amount:
     - Updates order `paymentStatus: 'paid'` and `orderStatus: 'confirmed'`.
     - Decrements product inventory stock.
  3. Else: marks payment failed.

#### `GET /api/orders/my`
- **Access:** Protected (Customer Only)
- **Description:** Customer's order history with tracking timeline.

#### `GET /api/orders/gardener`
- **Access:** Protected (Gardener Only)
- **Description:** Orders awaiting dispatch and shipping by the gardener.

#### `PUT /api/orders/:id/status`
- **Access:** Protected (Gardener Only)
- **Request Body:** `{ "orderStatus": "shipped" }`
- **Allowed Transitions:** `pending` -> `confirmed` -> `shipped` -> `delivered`

#### `GET /api/orders/admin`
- **Access:** Protected (Administrator Only — Read-Only Oversight)
- **Description:** Platform-wide order monitoring.

#### `GET /api/payments/admin`
- **Access:** Protected (Administrator Only)
- **Description:** Auditable transaction log with transaction IDs, amounts, and statuses.

---

### 2.6 Personal Plant Care Journal (`/api/plants`)

#### `GET /api/plants`
- **Access:** Protected (Customer Only)
- **Description:** List customer's personal plants with computed overdue / due-today reminders.

#### `POST /api/plants`
- **Access:** Protected (Customer Only)
- **Request Body:**
  ```json
  {
    "nickname": "Monty",
    "botanicalName": "Monstera deliciosa",
    "location": "indoor",
    "wateringIntervalDays": 7,
    "fertilizingIntervalDays": 30
  }
  ```

#### `POST /api/plants/:id/care-action`
- **Access:** Protected (Customer Only)
- **Request Body:** `{ "actionType": "watered", "notes": "Thorough soak" }`
- **Description:** Logs care in `PlantCareLog` and resets `nextWateringDate`.

#### `GET /api/plants/reminders/today`
- **Access:** Protected (Customer Only)
- **Description:** Returns alert collection of plants needing care today.

---

### 2.7 Google Gemini AI Botanical Assistant (`/api/chat`)

#### `GET /api/chat/sessions`
- **Access:** Protected (Customer Only)
- **Description:** Retrieves customer's saved chat sessions.

#### `POST /api/chat/sessions`
- **Access:** Protected (Customer Only)
- **Request Body:** `{ "title": "Yellow leaves diagnosis" }`

#### `POST /api/chat/sessions/:sessionId/message`
- **Access:** Protected (Customer Only)
- **Request Body:** `{ "text": "Why are the leaves of my monstera drooping?" }`
- **Description:** Communicates with Gemini API with botanical system instructions and saves response in customer's isolated session.

---

### 2.8 Analytics & Dashboards (`/api/analytics`)

#### `GET /api/analytics/gardener`
- **Access:** Protected (Gardener Only)
- **Response:** Sales revenue, booking stats, low-stock warnings, 6-month performance trend data.

#### `GET /api/analytics/admin`
- **Access:** Protected (Administrator Only)
- **Response:** Platform GMV, total customer count, booking distribution, and recent activity logs.
