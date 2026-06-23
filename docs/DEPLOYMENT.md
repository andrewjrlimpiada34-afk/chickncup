# Deployment Guide

## Architecture

- Vercel hosts the React frontend from the repo root.
- Render hosts the Express backend from the `server` directory.
- MongoDB Atlas stores users, menu items, and orders.

## 1. MongoDB Atlas

1. Create a MongoDB Atlas project and cluster.
2. Create a database user.
3. Add your IP if testing locally, or allow Render access as needed.
4. Copy the connection string and place it into `server/.env` as `MONGODB_URI`.

## 2. Run the backend locally

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

Recommended local values:

```bash
PORT=5000
NODE_ENV=development
MONGODB_URI=your_atlas_connection_string
JWT_SECRET=your_long_random_secret
CLIENT_URL=http://localhost:5173
SEED_ON_START=true
ADMIN_EMAIL=admin@chickncup.com
ADMIN_PASSWORD=admin123
```

Seed the database manually if needed:

```bash
npm run seed
```

## 3. Run the frontend locally

Create a root `.env` file:

```bash
VITE_API_URL=http://localhost:5000
```

Then:

```bash
npm install
npm run dev
```

## 4. Deploy frontend to Vercel

Project settings:

- Framework preset: `Vite`
- Root directory: repo root
- Build command: `npm run build`
- Output directory: `dist`

Frontend environment variables:

- `VITE_API_URL=https://your-render-service.onrender.com`

Notes:

- `vercel.json` is included so React Router routes like `/menu`, `/orders`, and `/admin` resolve correctly on refresh.
- After setting a new environment variable in Vercel, trigger a new deployment.

## 5. Deploy backend to Render

Create a new Web Service on Render and point it to the same repo.

Render service settings:

- Root directory: `server`
- Environment: `Node`
- Build command: `npm install`
- Start command: `npm start`

Render environment variables:

- `NODE_ENV=production`
- `PORT=10000`
- `MONGODB_URI=your_atlas_connection_string`
- `JWT_SECRET=your_long_random_secret`
- `CLIENT_URL=https://your-vercel-app.vercel.app`
- `SEED_ON_START=true`
- `ADMIN_EMAIL=admin@chickncup.com`
- `ADMIN_PASSWORD=admin123`
- `ADMIN_NAME=Chick N' Cup Admin`
- `ADMIN_PHONE=09605763695`

Once the first deploy succeeds, visit:

- `https://your-render-service.onrender.com/api/health`

You should receive a JSON health response.

## 6. Production checklist

- Confirm Vercel frontend can log in against Render backend.
- Confirm admin can add, edit, and delete menu items.
- Confirm menu changes appear on the public menu page.
- Confirm checkout creates MongoDB orders.
- Confirm admin can update order statuses.
- Confirm CORS only allows your Vercel domain.
