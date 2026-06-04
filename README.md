# HireBlue

Sector-focused hiring platform for restaurant, healthcare, textile, and student gig workers in India.

## Stack

- **Frontend:** React + Vite (`frontend/`)
- **Backend:** Node.js + Express + MongoDB (`backend/`)

## Quick start

### 1. Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm install
npm run dev
```

API runs at `http://127.0.0.1:5001` by default.

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

App runs at `http://localhost:5173`.

### 3. Seed sample data (optional)

```bash
cd backend
node seed.js
```

## Environment variables

See `backend/.env.example` and `frontend/.env.example`.

## Implemented vs planned

**Working today:** auth, job posting (with quotas), job browse/apply, employer applicant management, basic messaging, demo identity verification API, subscription plan flags (no real payments).

**Not yet built:** real Aadhaar OTP, payment gateway, push notifications, job expiry cron, full chat/interview flows described in `generate_doc.js`.

## Scripts

| Location   | Command        | Description        |
|-----------|----------------|--------------------|
| `backend/` | `npm run dev`  | API with nodemon   |
| `frontend/` | `npm run dev` | Vite dev server    |
| `frontend/` | `npm run build` | Production build |
