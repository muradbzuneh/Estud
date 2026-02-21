# Student Portal Application

Full-stack application with React frontend and Express backend for managing student activities including announcements, cafe reservations, and marketplace.

## Project Structure

```
├── backend/          # Express + TypeScript API
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── config/
│   └── server.ts
│
└── frontend/         # React + TypeScript + Vite
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── context/
    │   └── utils/
    └── App.tsx
```

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
```

4. Start the development server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
npm install react-router-dom axios
```

3. Create `.env` file:
```
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/students/register` - Register new student
- `POST /api/students/login` - Login
- `GET /api/students/profile` - Get user profile (protected)

### Announcements
- `GET /api/announcment` - Get all announcements
- `POST /api/announcment` - Create announcement (admin only)

### Cafe Reservations
- `GET /api/timeslotes` - Get available time slots
- `POST /api/reservations` - Create reservation
- `GET /api/reservations/my` - Get user's reservations
- `DELETE /api/reservations/:id` - Cancel reservation

### Marketplace
- `GET /api/marketplace` - Get all items
- `POST /api/marketplace` - Create listing
- `GET /api/marketplace/:id` - Get item details

## Features

- User authentication with JWT
- Role-based access control (Student/Admin)
- Announcements management
- Cafe time slot booking system
- Marketplace for buying/selling items
- Responsive UI with Tailwind CSS

## Tech Stack

### Backend
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- bcrypt for password hashing

### Frontend
- React 19
- TypeScript
- Vite
- React Router
- Axios
- Tailwind CSS

## Development

Run both servers concurrently for development:

Terminal 1 (Backend):
```bash
cd backend && npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend && npm run dev
```
