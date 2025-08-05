# Vercel Deployment Fixes

## Issues Fixed:

### 1. CORS Configuration ✅

- Updated `backend/server.js` to include your new domains:
  - `https://portfolio-psv.vercel.app`
  - `https://portfolio-psvamsi.vercel.app`
  - `https://portfolio-roan-sigma-17.vercel.app`

### 2. API URL Configuration ✅

- Updated `frontend/src/config/api.js` to use the correct backend URL
- Backend URL: `https://portfolio-roan-sigma-17.vercel.app/api`

### 3. WebGL Error Handling ✅

- Added error boundary for Three.js components
- Fixed container sizing issues in Hyperspeed component
- Added fallback UI for WebGL errors

## Environment Variables to Set in Vercel:

### Backend Environment Variables:

```
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=production
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend Environment Variables:

```
VITE_BACKEND_URL=https://portfolio-roan-sigma-17.vercel.app/api
```

## Steps to Deploy:

### 1. Backend Deployment:

1. Push the updated code to GitHub
2. In Vercel dashboard, go to your backend project
3. Go to Settings → Environment Variables
4. Add the environment variables listed above
5. Redeploy the backend

### 2. Frontend Deployment:

1. Push the updated code to GitHub
2. In Vercel dashboard, go to your frontend project
3. Go to Settings → Environment Variables
4. Add `VITE_BACKEND_URL=https://portfolio-roan-sigma-17.vercel.app/api`
5. Redeploy the frontend

### 3. Test the Deployment:

1. Test backend health: `https://portfolio-roan-sigma-17.vercel.app/`
2. Test API endpoints: `https://portfolio-roan-sigma-17.vercel.app/api/projects`
3. Test frontend: `https://portfolio-psv.vercel.app`

## Troubleshooting:

### If CORS errors persist:

1. Check that both domains are in the `allowedOrigins` array:
   - Frontend domain: `https://portfolio-psvamsi.vercel.app`
   - Backend domain: `https://portfolio-roan-sigma-17.vercel.app`
2. Verify the backend is deployed and accessible
3. Check browser console for specific error messages
4. **Current fix**: Added `https://portfolio-psvamsi.vercel.app` to the CORS allowed origins

### If WebGL errors persist:

1. The error boundary will show a fallback UI
2. Check if WebGL is enabled in the browser
3. Try refreshing the page

### If API calls fail:

1. Verify the `VITE_BACKEND_URL` environment variable is set correctly
2. Check that the backend is running and accessible
3. Verify MongoDB connection is working

## Files Modified:

- `backend/server.js` - CORS configuration
- `backend/vercel.json` - Vercel routing
- `frontend/src/config/api.js` - API URL configuration
- `frontend/src/components/hyperSpeed/Hyperspeed.jsx` - WebGL fixes
- `frontend/src/components/intro3d/Intro3D.jsx` - Error handling
- `frontend/src/components/WebGLErrorBoundary.jsx` - New error boundary
