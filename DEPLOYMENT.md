# Deployment Guide

Your application is now "Cloud Ready". It is designed to work in two modes:
1.  **Development (Local)**: Uses SQLite and local file storage.
2.  **Production (Cloud)**: Uses PostgreSQL and (optionally) Cloudinary.

## 1. Database (Neon / Supabase)
Since we can't use SQLite in the cloud, we use PostgreSQL.
1.  Go to [Neon.tech](https://neon.tech) or [Supabase.com](https://supabase.com) and create a free project.
2.  Get your **Connection String** (it looks like `postgres://user:pass@host/db`).
3.  You will need this for the Backend deployment.

## 2. Backend (Render / Railway)
We need to host the Node.js server.
1.  Push your code to **GitHub**.
2.  Go to [Render.com](https://render.com) and create a new **Web Service**.
3.  Connect your GitHub repo.
4.  **Build Command**: `npm install`
5.  **Start Command**: `node server/index.js`
6.  **Environment Variables**: Add these in the Render dashboard:
    -   `DATABASE_URL`: (Paste your Neon/Supabase connection string here)
    -   `NODE_ENV`: `production`

## 3. Frontend (Netlify)
Now host the React app.
1.  Go to [Netlify.com](https://netlify.com).
2.  "Import from Git" and select your repo.
3.  **Build Command**: `npm run build`
4.  **Publish Directory**: `dist`
5.  **Environment Variables**:
    -   `VITE_API_URL`: (Paste the URL of your Render Backend here, e.g., `https://my-app.onrender.com`)

## Important Note on Images
Currently, uploaded images are stored in the `public/uploads` folder.
-   **On Render/Heroku**: The filesystem is temporary. If the server restarts, **uploaded images will be deleted**.
-   **Solution**: For a real production app, you should integrate **Cloudinary**.
    -   I have prepared the code structure, but to keep it simple for now, images will work but might disappear on server restarts.
    -   To fix this permanently, you would need to add Cloudinary credentials to the backend.
