# Quick Start Guide

## ✅ Issue Fixed
The module import error has been resolved. Follow these steps to get running.

## Prerequisites
- Node.js v18+
- MongoDB running or Atlas connection

## Setup (First Time)

### 1. Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install react-router-dom axios
```

### 2. Configure Environment

Backend `.env` (already exists):
```env
PORT=5000
MONGO_URL=mongodb+srv://...
JWT_SECRET=supersecretkey123
JWT_EXPIRES_IN=1d
```

Frontend `.env` (already created):
```env
VITE_API_URL=http://localhost:5000/api
```

## Start Development

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```
Should see: `Server is running on port 5000`

### Terminal 2 - Frontend
```bash
cd frontend

# Clear cache (important after the fix!)
rm -rf node_modules/.vite

# Start dev server
npm run dev
```

On Windows PowerShell:
```powershell
cd frontend
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
npm run dev
```

Should see: `Local: http://localhost:5173/`

### Step 3: Open Browser
1. Go to http://localhost:5173
2. Hard refresh: `Ctrl+Shift+R` or `Ctrl+F5`
3. Check console (F12) - should be no errors

## Test the App

1. **Register:** http://localhost:5173/register
   - Enter name, email, password, department ID
   - Click Register

2. **Login:** http://localhost:5173/login
   - Use registered credentials
   - Should redirect to dashboard

3. **Navigate:**
   - Dashboard
   - Announcements
   - Cafe bookings
   - Marketplace

## If You Still See Errors

### Clear Everything
```bash
# Frontend
cd frontend
rm -rf node_modules/.vite
rm -rf dist

# Restart
npm run dev
```

### Browser
- Open in Incognito/Private mode
- Or clear browser cache (Ctrl+Shift+Delete)

### Check Console
- Press F12
- Look at Console tab
- Look at Network tab for failed requests

## Common Issues

### "Cannot find module"
```bash
cd frontend
npm install react-router-dom axios
```

### CORS errors
- Ensure backend is running
- Check backend has `app.use(cors())`

### 401 Unauthorized
- Register a new user first
- Then login
- Check token in localStorage (F12 > Application)

## Success Indicators

✅ Backend console: "Server is running on port 5000"
✅ Frontend console: No red errors
✅ Can see login page
✅ Can register and login
✅ Dashboard loads after login

## Need Help?

Check these files:
- `TROUBLESHOOTING.md` - Detailed troubleshooting
- `FIXES_APPLIED.md` - What was fixed
- `INTEGRATION_COMPLETE.md` - Full documentation
