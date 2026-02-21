# Quick Setup Guide

## Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

## Installation Steps

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install react-router-dom axios
```

### 3. Configure Environment Variables

Backend `.env` (already exists):
```
PORT=5000
MONGO_URL=mongodb+srv://...
JWT_SECRET=supersecretkey123
JWT_EXPIRES_IN=1d
```

Frontend `.env` (created):
```
VITE_API_URL=http://localhost:5000/api
```

### 4. Start Development Servers

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

## API Integration Summary

### Updated Services
✅ `authService.ts` - Uses `/api/students/login` and `/api/students/register`
✅ `announcementService.ts` - Uses `/api/announcment`
✅ `cafeService.ts` - Uses `/api/timeslotes` and `/api/reservations`
✅ `marketplaceService.ts` - Uses `/api/marketplace`

### Backend Routes Added
✅ Marketplace routes at `/api/marketplace`
✅ CORS enabled for frontend communication
✅ All existing routes maintained

### Frontend Features
✅ Authentication with JWT tokens
✅ Protected routes with AuthContext
✅ Axios interceptors for token management
✅ Error handling and loading states
✅ Responsive UI with Tailwind CSS

## Testing the Integration

1. Register a new user at `http://localhost:5173/register`
2. Login at `http://localhost:5173/login`
3. Navigate through:
   - Dashboard
   - Announcements
   - Cafe bookings
   - Marketplace

## Common Issues

### CORS Errors
- Ensure backend has `cors` package installed
- Check `app.ts` has `app.use(cors())`

### 401 Unauthorized
- Check JWT token in localStorage
- Verify token is being sent in Authorization header

### Connection Refused
- Ensure backend is running on port 5000
- Check MongoDB connection string is correct
