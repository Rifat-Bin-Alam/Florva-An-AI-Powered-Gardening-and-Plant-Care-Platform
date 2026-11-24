# Florva V2 — Project Development Status

## Milestone 1: Initial Application, Authentication & Multi-Role Dashboards

**Status:** Completed & Fully Verified  
**Date:** November 2026  
**Platform Architecture:** MERN Stack (MongoDB, Express.js, React 18, Node.js, Vite 5, Tailwind CSS)  
**Database Connection:** `mongodb://127.0.0.1:27017/florva` (Local MongoDB)

---

### 1. Milestone 1 Summary
- Botanical homepage (`/`) with responsive layout, theme toggle (Dark/Light), and navigation.
- Full-stack registration with bcrypt (10 rounds) password encryption and duplicate email prevention.
- Security restriction: Public registration as Administrator strictly blocked (`403 Forbidden`).
- Full-stack JWT login, persistent auth state, and automatic session restoration.
- Protected multi-role routing (`ProtectedRoute.jsx`) and backend authorization middleware (`protect`, `authorize`).
- Dedicated dashboards for Customer (`/customer`), Gardener (`/gardener`), and Administrator (`/admin`).

---

## Milestone 2: Gardener Product Management CRUD

**Status:** Completed & Fully Verified  
**Date:** November 2026  
**Module:** Gardener Operational Workbench & Plant Catalog Inventory

---

### 1. Database Verification Results (Pre-Implementation)
Prior to starting Milestone 2, the live database was inspected and verified:
- **Connection URI:** `mongodb://127.0.0.1:27017/florva` (State: 1 = Connected).
- **Users Collection:** Contains 5 active user documents (`admin@florva.com`, `gardener@florva.com`, `customer@florva.com`, `user_1795516592834@florva-test.com`, `amina@example.com`).
- **Password Encryption:** Verified that 100% of stored passwords are salted 10-round bcrypt hashes (`$2b$10$...`); zero plaintext passwords.
- **Indexes:** Verified primary index `_id_` and unique index `email_1`.
- **Database Safety:** No records were deleted, and the database was preserved without dropping.

---

### 2. Features Implemented in Milestone 2

1. **Gardener Product CRUD (Backend & Frontend):**
   - **View Products:** The authenticated Gardener can view all plant specimens they created, with live search (by name or description) and category filter.
   - **Create Specimen:** Complete creation form accepting name, description, category, price, stock, status, and image.
   - **Inspect Specimen:** Detail modal displaying botanical information, stock status, timestamps, and thumbnail.
   - **Update Specimen:** Full edit modal allowing updates to price, stock, category, description, and optional image replacement.
   - **Quick Availability Toggle:** Inline status switch between `in_stock`, `out_of_stock`, and `discontinued`, automatically synchronizing the `inStock` boolean.
   - **Delete Specimen:** Confirmation modal permanently deletes the product document from MongoDB and removes the image file from server storage.
   - **Strict Ownership Verification:** Every product is tied to `gardener: req.user._id`. A gardener can only query, edit, or delete their own products. Other roles (e.g. Customer) receive `403 Forbidden`.

2. **Strict Product Image Processing & Content Validation (Sharp & Multer):**
   - **Upload Limits:** Enforced original upload limit of **5 MB**; files larger than 5 MB are rejected immediately with HTTP 400.
   - **Magic-Byte Content Inspection:** Sharp inspects the image buffer header and metadata (`sharp(buffer).metadata()`) to reject corrupted files and files disguised with fake extensions.
   - **Exact Output Dimensions:** Resized and cropped to **exactly 100 × 100 pixels** (`fit: 'cover'`, `position: 'center'`). Verified before saving.
   - **Strict Output File Size:** Iterative compression guarantees final stored file is strictly **<= 100 KB** (102,400 bytes). Verified before saving.
   - **Supported Formats:** JPG, JPEG, PNG, and WebP.
   - **Zero Orphaned Files:** Multer memory storage holds buffers in RAM; disk files are written only after all validations pass. If database insertion/update fails, the newly written image is immediately deleted.
   - **Static Serving & Vite Proxy:** Express static directory serves `/uploads` with permissive CORS/CORP headers; Vite proxies `/uploads` to port 5000 with automatic fallback resolution.

---

### 3. Files Created or Modified in Milestone 2

```
V2/
├── server/
│   ├── src/
│   │   ├── app.js                              # Added static /uploads serving & /api/products route
│   │   ├── models/
│   │   │   └── Product.js                      # Product Schema (name, desc, category, price, stock, image, status, gardener)
│   │   ├── middleware/
│   │   │   ├── uploadMiddleware.js             # Multer memory storage & Sharp 100x100 / <=100KB processing
│   │   │   └── errorMiddleware.js              # Multer & file upload error formatting (HTTP 400)
│   │   ├── controllers/
│   │   │   ├── productController.js            # getGardenerProducts, getProductById, createProduct, updateProduct, deleteProduct, updateProductStatus
│   │   │   └── dashboardController.js          # Updated getGardenerDashboard & getAdminDashboard with real Product counts
│   │   └── routes/
│   │       └── productRoutes.js                # Protected Gardener Product endpoints
│   └── uploads/
│       └── products/                           # Dedicated disk directory for 100x100 product images
└── client/
    └── src/
        ├── components/
        │   ├── layout/
        │   │   └── DashboardLayout.jsx         # Enhanced with interactive sidebar navigation
        │   └── gardener/
        │       └── GardenerProductManagement.jsx # Complete Product CRUD UI (search, filters, add/edit/delete modals, preview)
        └── pages/
            └── dashboard/
                └── GardenerDashboard.jsx       # Integrated live inventory management workbench & real-time stats
```

---

### 4. API Endpoints for Product CRUD

| Method | Endpoint | Protection | Description |
|---|---|---|---|
| `GET` | `/api/products` | `protect`, `authorize('gardener')` | Get authenticated gardener's products with search and category filters |
| `POST` | `/api/products` | `protect`, `authorize('gardener')` | Create new product with 100x100 Sharp image processing |
| `GET` | `/api/products/:id` | `protect`, `authorize('gardener')` | Get single product (verifies gardener ownership) |
| `PUT` | `/api/products/:id` | `protect`, `authorize('gardener')` | Update product details and/or replace image (verifies ownership) |
| `DELETE` | `/api/products/:id` | `protect`, `authorize('gardener')` | Delete product from MongoDB and delete image from disk |
| `PATCH` | `/api/products/:id/status`| `protect`, `authorize('gardener')` | Toggle availability status (`in_stock` / `out_of_stock`) |

---

### 5. Product Schema Definition

```javascript
{
  name: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, required: true, trim: true, maxlength: 1000 },
  category: {
    type: String,
    required: true,
    enum: ['Indoor Plants', 'Flowering Plants', 'Succulents & Cacti', 'Pots & Planters', 'Fertilizers & Soil', 'Gardening Tools', 'Other'],
    default: 'Indoor Plants'
  },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0, default: 0 },
  image: { type: String, required: true }, // e.g. /uploads/products/product-173244...jpg
  status: {
    type: String,
    enum: ['in_stock', 'out_of_stock', 'discontinued'],
    default: 'in_stock'
  },
  inStock: { type: Boolean, default: true },
  gardener: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timestamps: true // createdAt, updatedAt
}
```

---

### 6. Automated Testing Results (20/20 Passed)

- **Auth Verification:** Gardener login succeeds; Customer login succeeds.
- **Role Protection:** Customer role blocked from `/api/products` with `403 Forbidden`.
- **Unauthenticated Protection:** Anonymous request blocked with `401 Unauthorized`.
- **Product Creation:** Specimen created via multipart upload; document stored in MongoDB.
- **Image Resizing:** Sharp cropped image to **exactly 100 × 100 pixels** (verified via Sharp metadata).
- **Image Size Limit:** Image file size verified as **<= 100 KB** (Actual: 0.33 KB).
- **Product Retrieval:** Product listed in gardener collection and fetched by ID.
- **Product Update:** Name and price updated; replacement image processed to 100x100; old image cleaned up.
- **Status Toggle:** Status switched to `out_of_stock` and `inStock` automatically synced to `false`.
- **Validation Rejection:** Negative price/stock rejected with `400 Bad Request`.
- **Format Rejection:** Non-image file format (`.txt`) rejected with `400 Bad Request`.
- **Product Deletion:** Document removed from MongoDB and image removed from server disk; subsequent fetch returns `404 Not Found`.

---

### 7. Scope Restrictions Notice

In strict adherence to the practicum development roadmap:
- Customer storefront catalog, shopping cart, orders, checkout, payments, and service appointments remain in their respective future milestones.
- Milestone 2 is strictly focused on Gardener Product CRUD and image processing.
