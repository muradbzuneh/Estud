# Student Portal Application

Full-stack application with React frontend and Express backend for managing student activities including announcements, cafe reservations, and marketplace.

## 📚 Documentation

- [Quick Start Guide](QUICK_START.md) - Get up and running quickly
- [API Reference](API_REFERENCE.md) - Complete API documentation
- [Setup Guide](setup.md) - Detailed setup instructions
- [Fixes Applied](FIXES_AND_IMPROVEMENTS.md) - Recent improvements and fixes
- [Troubleshooting](TROUBLESHOOTING.md) - Common issues and solutions

## Project Structure

```
├── backend/          # Express + TypeScript API
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   ├── middlewares/    # Auth, upload, role middleware
│   │   ├── config/         # Database configuration
│   │   └── utils/          # Utility functions
│   ├── uploads/            # Uploaded files
│   └── server.ts           # Entry point
│
└── frontend/         # React + TypeScript + Vite
    ├── src/
    │   ├── components/     # Reusable components
    │   ├── pages/          # Page components
    │   ├── services/       # API services
    │   ├── context/        # React context
    │   ├── hooks/          # Custom hooks
    │   ├── types/          # TypeScript types
    │   └── utils/          # Utility functions
    └── App.tsx             # Main app component
```

## Features

### 🔐 Authentication & Authorization
- User registration and login with JWT
- Role-based access control (Student, Admin, Café Manager)
- Profile management with image upload
- Secure password hashing with bcrypt

### 📢 Announcements System
- Admin can create announcements with images
- Target specific groups (University, Department, Class)
- Expiration dates for announcements
- Mark announcements as important
- Read/unread status tracking
- Search and filter functionality

### 🔔 Notifications
- Real-time notification system
- Notification types: announcements, reservations, marketplace
- Mark as read/unread
- Bulk mark all as read
- Delete notifications
- Unread count badge

### ☕ Café Reservation System
- Café managers create time slots
- Students book available slots
- First-come, first-served booking
- Prevent overlapping reservations
- Cancel reservations before slot time
- View booking history
- Real-time seat availability

### 🛒 Marketplace
- Students list items for sale
- Upload multiple images per listing
- Filter by category and department
- Search functionality
- Mark items as sold
- Maximum 5 active listings per student
- Admin can remove inappropriate listings

### 🏢 Department Management
- Create and manage departments
- Department-based filtering
- Associate users with departments

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **File Upload**: Multer
- **CORS**: cors middleware

### Frontend
- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **State Management**: React Context API

## Quick Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

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
```env
PORT=5000
MONGO_URL=mongodb+srv://your_connection_string
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=1d
```

4. Start the development server:
```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## API Endpoints Overview

### Authentication & Users
- `POST /api/students/register` - Register new user
- `POST /api/students/login` - User login
- `GET /api/students/profile` - Get user profile
- `PUT /api/students/profile` - Update profile

### Departments
- `POST /api/department/register` - Create department
- `GET /api/department` - Get all departments

### Announcements
- `POST /api/announcment` - Create announcement (Admin)
- `GET /api/announcment` - Get all announcements
- `GET /api/announcment/:id` - Get single announcement
- `PUT /api/announcment/:id` - Update announcement (Admin)
- `DELETE /api/announcment/:id` - Delete announcement (Admin)

### Notifications
- `GET /api/notifications` - Get user notifications
- `PATCH /api/notifications/:id/read` - Mark as read
- `PATCH /api/notifications/read-all` - Mark all as read
- `DELETE /api/notifications/:id` - Delete notification

### Café Reservations
- `POST /api/timeslotes` - Create time slot (Manager)
- `GET /api/timeslotes` - Get available slots
- `POST /api/reservations` - Create reservation
- `GET /api/reservations/my` - Get my reservations
- `DELETE /api/reservations/:id` - Cancel reservation

### Marketplace
- `POST /api/marketplace` - Create listing
- `GET /api/marketplace` - Get all listings
- `GET /api/marketplace/my` - Get my listings
- `GET /api/marketplace/:id` - Get item details
- `PATCH /api/marketplace/:id/sold` - Mark as sold
- `DELETE /api/marketplace/:id` - Delete listing

See [API_REFERENCE.md](API_REFERENCE.md) for complete documentation.

## User Roles

- **STUDENT**: Can create reservations, marketplace listings, view announcements
- **ADMIN**: Full access, can create announcements, manage all content
- **CAFE_MANAGER**: Can manage time slots and view bookings

## Development

Run both servers concurrently for development:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

## Building for Production

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based authorization
- File upload validation (type and size)
- Input sanitization
- CORS configuration
- Environment variable protection

## Recent Updates (March 1, 2026)

- ✅ Fixed authentication controller bugs
- ✅ Added complete notification system
- ✅ Fixed typos in models and controllers
- ✅ Added department listing endpoint
- ✅ Improved error handling
- ✅ Added missing routes
- ✅ Updated frontend services
- ✅ Enhanced type definitions

See [FIXES_AND_IMPROVEMENTS.md](FIXES_AND_IMPROVEMENTS.md) for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License

## Support

For issues and questions, please check:
- [Troubleshooting Guide](TROUBLESHOOTING.md)
- [API Reference](API_REFERENCE.md)
- [Setup Guide](setup.md)
