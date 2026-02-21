# Troubleshooting Guide

## Fixed Issues

### ✅ Module Import Error - "does not provide an export named 'User'"

**Problem:** 
```
Uncaught SyntaxError: The requested module '/src/types/index.ts' 
does not provide an export named 'User'
```

**Root Cause:** 
Import path in `AuthContext.tsx` had incorrect `.js` extension for TypeScript file.

**Solution Applied:**
Changed from `import { User } from '../types/index.js'` to `import { User } from '../types'`

**How to Apply Fix:**
1. Stop the dev server (Ctrl+C)
2. Clear Vite cache:
```bash
cd frontend
rm -rf node_modules/.vite
```
3. Restart dev server:
```bash
npm run dev
```
4. Hard refresh browser (Ctrl+Shift+R or Ctrl+F5)

---

## Common Issues & Solutions

### Issue: "Cannot find module" errors

**Solution:**
```bash
cd frontend
npm install react-router-dom axios
```

### Issue: CORS errors in browser console

**Check:**
1. Backend has `cors` installed: `cd backend && npm install cors`
2. Backend `app.ts` includes: `app.use(cors())`
3. Backend is running on port 5000
4. Frontend `.env` has correct API URL: `VITE_API_URL=http://localhost:5000/api`

### Issue: 401 Unauthorized errors

**Check:**
1. User is logged in
2. Token exists in localStorage (F12 > Application > Local Storage)
3. Token is being sent in requests (F12 > Network > Headers)
4. Backend JWT_SECRET matches

### Issue: White screen / App not loading

**Steps:**
1. Check browser console (F12) for errors
2. Verify both servers are running:
   - Backend: http://localhost:5000
   - Frontend: http://localhost:5173
3. Clear browser cache and reload
4. Check network tab for failed requests

### Issue: TypeScript errors in IDE

**Solution:**
```bash
cd frontend
npm run build
```
This will show all TypeScript errors. Most common fixes:
- Add missing type imports
- Use `type` keyword for type-only imports
- Check for typos in import paths

### Issue: Vite cache problems

**Solution:**
```bash
cd frontend
rm -rf node_modules/.vite
rm -rf dist
npm run dev
```

### Issue: MongoDB connection errors

**Check:**
1. MongoDB is running (local) or connection string is correct (Atlas)
2. `.env` file has correct `MONGO_URL`
3. IP whitelist includes your IP (for MongoDB Atlas)

---

## Development Checklist

Before starting development, ensure:

- [ ] Node.js v18+ installed
- [ ] MongoDB running or Atlas connection ready
- [ ] Backend `.env` configured
- [ ] Frontend `.env` configured
- [ ] Dependencies installed in both folders
- [ ] Both dev servers running
- [ ] Browser console shows no errors

---

## Quick Commands Reference

### Backend
```bash
cd backend
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
```

### Frontend
```bash
cd frontend
npm install                    # Install dependencies
npm install react-router-dom axios  # Install routing & HTTP client
npm run dev                    # Start dev server
npm run build                  # Build for production
npm run preview                # Preview production build
```

### Clear All Caches
```bash
# Frontend
cd frontend
rm -rf node_modules/.vite
rm -rf dist

# Backend (if needed)
cd backend
rm -rf dist
```

---

## Environment Variables

### Backend `.env`
```env
PORT=5000
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=1d
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:5000/api
```

---

## Browser DevTools Tips

### Check API Requests
1. Open DevTools (F12)
2. Go to Network tab
3. Filter by "Fetch/XHR"
4. Look for failed requests (red)
5. Click on request to see details

### Check Console Errors
1. Open DevTools (F12)
2. Go to Console tab
3. Look for red error messages
4. Click on error to see stack trace

### Check Local Storage
1. Open DevTools (F12)
2. Go to Application tab
3. Expand Local Storage
4. Check for 'token' key

---

## Still Having Issues?

1. Check all files match the structure in `INTEGRATION_COMPLETE.md`
2. Verify all imports use correct paths (no `.js` in frontend TypeScript)
3. Ensure backend routes match frontend service calls
4. Check MongoDB connection
5. Verify JWT token is being generated and stored
6. Test API endpoints directly with Postman/Thunder Client
