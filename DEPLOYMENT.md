# 🚀 Deployment Guide - Share Your AI Fortune Cookie

This guide covers the easiest ways to deploy your app so your community can use it!

## 🎯 Recommended: Render (Easiest - Free Tier Available)

**Render** is the easiest option - it handles both frontend and backend automatically.

### Step 1: Prepare for Deployment

1. **Update frontend API URL** to use environment variable
2. **Create deployment configs**

### Step 2: Deploy Backend

1. Go to https://render.com and sign up (free)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `yksanjo/AI-Fortune-Cookie`
4. Configure:
   - **Name**: `ai-fortune-cookie-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python -m backend.main` (or `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`)
   - **Instance Type**: Free

5. Add Environment Variables (if using Hugging Face):
   - `HUGGINGFACE_API_KEY` = your_key (optional)

6. Click "Create Web Service"
7. Wait for deployment (~5 minutes)
8. Copy your backend URL (e.g., `https://ai-fortune-cookie-backend.onrender.com`)

### Step 3: Deploy Frontend

1. In Render, click "New +" → "Static Site"
2. Connect same GitHub repository
3. Configure:
   - **Name**: `ai-fortune-cookie`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
   - **Environment**: `Node`

4. Add Environment Variable:
   - `REACT_APP_API_URL` = your backend URL from Step 2

5. Click "Create Static Site"
6. Your app will be live! 🎉

---

## 🚂 Alternative: Railway (Also Very Easy)

**Railway** is another great option with a simple setup.

### Deploy Both Services

1. Go to https://railway.app and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select `yksanjo/AI-Fortune-Cookie`
4. Add two services:

**Backend Service:**
- Root: `backend`
- Start Command: `python -m backend.main`
- Port: Auto-detected
- Add env vars if needed

**Frontend Service:**
- Root: `frontend`  
- Build Command: `npm install && npm run build`
- Start Command: `npx serve -s build`
- Add env var: `REACT_APP_API_URL` = backend service URL

5. Railway will give you URLs for both services
6. Update frontend env var with backend URL
7. Redeploy frontend

---

## 🌐 Option 3: Vercel (Frontend) + Render (Backend)

**Best for**: Maximum performance and free tier

### Deploy Backend on Render
Follow Step 2 from Render section above.

### Deploy Frontend on Vercel

1. Go to https://vercel.com and sign up
2. Click "Add New" → "Project"
3. Import `yksanjo/AI-Fortune-Cookie`
4. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

5. Add Environment Variable:
   - `REACT_APP_API_URL` = your Render backend URL

6. Click "Deploy"
7. Done! Vercel gives you a URL like `ai-fortune-cookie.vercel.app`

---

## 📝 Required Code Changes

Before deploying, we need to update the frontend to use environment variables for the API URL.

### Update Frontend API URL

The frontend currently hardcodes `http://localhost:8000`. We need to make it configurable.

**File to update**: `frontend/src/App.js`

Change:
```javascript
const response = await fetch('http://localhost:8000/fortune', {
```

To:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const response = await fetch(`${API_URL}/fortune`, {
```

---

## 🐳 Option 4: Docker (Advanced)

If you want to deploy anywhere (AWS, DigitalOcean, etc.), Docker is the way.

### Create Dockerfile for Backend

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

CMD ["python", "-m", "backend.main"]
```

### Create Dockerfile for Frontend

```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## ⚡ Quick Deploy Script

I'll create a script to help you prepare for deployment.

---

## 🎯 Which Should You Choose?

| Platform | Difficulty | Free Tier | Best For |
|----------|-----------|-----------|----------|
| **Render** | ⭐ Easy | ✅ Yes | Quick deployment, both services |
| **Railway** | ⭐ Easy | ✅ Yes | Simple setup, good DX |
| **Vercel + Render** | ⭐⭐ Medium | ✅ Yes | Best performance |
| **Docker** | ⭐⭐⭐ Hard | ❌ No | Full control, any platform |

**Recommendation**: Start with **Render** - it's the easiest!

---

## 📋 Pre-Deployment Checklist

- [ ] Update frontend to use `REACT_APP_API_URL` env variable
- [ ] Test locally with production-like setup
- [ ] Ensure `.env` files are in `.gitignore`
- [ ] Update CORS settings if needed
- [ ] Test all features work
- [ ] Add error handling for network issues

---

## 🔧 Troubleshooting

### CORS Errors
If you get CORS errors, the backend already allows all origins (`allow_origins=["*"]`), so this should work.

### Environment Variables Not Working
- Make sure variable names start with `REACT_APP_` for Create React App
- Redeploy after adding env vars
- Check variable names match exactly

### Backend Not Starting
- Check build logs in Render/Railway dashboard
- Verify Python version (3.9+)
- Check that all dependencies are in `requirements.txt`

---

## 🎉 After Deployment

1. Share your URL with your community!
2. Monitor usage in your platform's dashboard
3. Set up custom domain (optional)
4. Enable auto-deploy from GitHub (usually on by default)

---

Need help? Check the platform-specific docs or open an issue!

