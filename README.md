# Florva V2 — Botanical Plant Care & Gardening Platform

Full-Stack MERN (MongoDB, Express.js, React, Node.js) Application developed for CSE Undergraduate Practicum.

## Quick Start Guide

### Prerequisites
- Node.js (v18+)
- MongoDB running locally on `mongodb://127.0.0.1:27017`

### 1. Database Seeding (Admin & Demo Accounts)
To provision the protected Administrator account and standard demonstration accounts:
```bash
cd V2
npm run seed
```
Default accounts seeded:
- **Administrator:** `admin@florva.com` / `Password123!`
- **Gardener:** `gardener@florva.com` / `Password123!`
- **Customer:** `customer@florva.com` / `Password123!`

### 2. Run the Backend API Server
```bash
cd V2/server
npm run dev
```
- Server URL: `http://localhost:5000`
- Health check: `http://localhost:5000/api/health`
- Static Uploads: `http://localhost:5000/uploads/products/...`

### 3. Run the Frontend Development Client
```bash
cd V2/client
npm run dev
```
- Application URL: `http://localhost:5173`

---

## Features Implemented in Milestone 1

1. **Botanical Public Homepage:** Modern responsive UI built with Tailwind CSS, showcasing Florva's brand aesthetic and navigation.
2. **User Registration:** Secure registration for Customer and Gardener roles with password hashing (bcrypt) and email uniqueness enforcement. Administrator accounts are protected from public registration.
3. **User Authentication (JWT):** Token-based authentication with persistent state and automatic profile hydration.
4. **Role-Based Access Control (RBAC):** Frontend route protection (`ProtectedRoute`) and backend middleware (`protect`, `authorize`) restricting Customer, Gardener, and Administrator access to their authorized dashboards.
5. **Three Distinct Dashboards:**
   - Customer Dashboard (`/customer`)
   - Gardener Operational Workbench (`/gardener`)
   - Administrator Governance Panel (`/admin`) with real-time MongoDB statistics.

---

## Features Implemented in Milestone 2 (Gardener Product CRUD)

1. **Product Management CRUD:**
   - Authenticated Gardener can create, inspect, update, and delete plant specimens.
   - Filter by category and status, plus live search by specimen name or description.
   - Quick status toggle (`in_stock` / `out_of_stock`).
2. **Strict 100 × 100 Pixel & <= 100 KB Image Processing:**
   - Powered by `sharp` on the backend.
   - Every uploaded image is cropped and resized to **exactly 100 × 100 pixels**.
   - Compressed to guarantee file size is **<= 100 KB**.
   - Accepts JPG, JPEG, PNG, and WebP formats.
   - Automatic cleanup of old image files on update or deletion.
3. **Strict Ownership Protection:**
   - Gardeners can only view, edit, or delete products they own.
   - Customers and unauthenticated users are blocked with `403 Forbidden` / `401 Unauthorized`.
