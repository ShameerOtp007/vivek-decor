# Deployment Guide

Your application is now **fully Cloud Ready**, including persistent image storage.

## 1. Database (Neon / Supabase)
1.  Go to [Neon.tech](https://neon.tech) and create a free project.
2.  Get your **Connection String**.

## 2. Image Storage (Cloudinary)
To ensure images uploaded in the Admin Panel don't disappear, we use Cloudinary.
1.  Go to [Cloudinary.com](https://cloudinary.com) and sign up for a free account.
2.  Go to your Dashboard and copy:
    -   **Cloud Name**
    -   **API Key**
    -   **API Secret**

## 3. Backend (Render)
1.  Push your code to **GitHub**.
2.  Create a **Web Service** on [Render.com](https://render.com).
3.  **Build Command**: `npm install`
4.  **Start Command**: `node server/index.js`
5.  **Environment Variables** (Add these in Render):
    -   `NODE_ENV`: `production`
    -   `DATABASE_URL`: (Your Neon Connection String)
    -   `CLOUDINARY_CLOUD_NAME`: (Your Cloud Name)
    -   `CLOUDINARY_API_KEY`: (Your API Key)
    -   `CLOUDINARY_API_SECRET`: (Your API Secret)

## 4. Frontend (Netlify)
1.  Create a new site on [Netlify](https://netlify.com) from your GitHub repo.
2.  **Build Command**: `npm run build`
3.  **Publish Directory**: `dist`
4.  **Environment Variables**:
    -   `VITE_API_URL`: (The URL of your Render Backend, e.g., `https://my-app.onrender.com`)

## Summary
-   **Local Development**: Just run `npm run dev`. It uses SQLite and local file storage.
-   **Production**: It automatically switches to PostgreSQL and Cloudinary when the environment variables are present.
