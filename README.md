# Chick N' Cup Food Ordering System

Frontend: React + Vite, intended for Vercel  
Backend: Express + MongoDB, intended for Render

## Frontend

```bash
npm install
npm run dev
```

Set `VITE_API_URL` in a local `.env` file when you want the frontend to call the backend:

```bash
VITE_API_URL=http://localhost:5000
```

If `VITE_API_URL` is not set, the app falls back to temporary localStorage-backed demo data for auth, menu items, and orders.

## Backend

```bash
cd server
npm install
npm run dev
```

Copy `server/.env.example` to `server/.env` and fill in:

- `MONGODB_URI`
- `JWT_SECRET`
- `CLIENT_URL`
- admin seed values if you want custom admin credentials

## Deployment Guides

- [Vercel + Render deployment](./docs/DEPLOYMENT.md)
- [MongoDB schema reference](./docs/MONGODB_SCHEMA.md)
