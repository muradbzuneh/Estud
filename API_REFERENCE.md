# API Reference Guide

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## 🔐 Authentication & Users

### Register User
```http
POST /students/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "studentId": "STU001",
  "departmentId": "dept_id",
  "role": "STUDENT"
}
```

### Login
```http
POST /students/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successfully",
  "token": "jwt_token",
  "student": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "STUDENT"
  }
}
```

### Get Profile
```http
GET /students/profile
Authorization: Bearer <token>
```

### Update Profile
```http
PUT /students/profile
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "name": "John Updated",
  "profileImage": <file>
}
```

---

## 🏢 Departments

### Create Department (Admin)
```http
POST /department/register
Content-Type: application/json

{
  "name": "Computer Science"
}
```

### Get All Departments
```http
GET /department
```

---

## 📢 Announcements

### Create Announcement (Admin)
```http
POST /announcment
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "Important Notice",
  "content": "Announcement content here",
  "targetGroup": "UNIVERSITY",
  "expiresAt": "2026-12-31",
  "isImportant": true,
  "image": <file>
}
```

### Get All Announcements
```http
GET /announcment?page=1&limit=10&search=exam&category=UNIVERSITY
Authorization: Bearer <token>
```

### Get Single Announcement
```http
GET /announcment/:id
Authorization: Bearer <token>
```

### Update Announcement (Admin)
```http
PUT /announcment/:id
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "Updated Title",
  "content": "Updated content"
}
```

### Delete Announcement (Admin)
```http
DELETE /announcment/:id
Authorization: Bearer <token>
```

---

## 🔔 Notifications

### Get Notifications
```http
GET /notifications?page=1&limit=20
Authorization: Bearer <token>

Response:
{
  "notifications": [...],
  "unreadCount": 5,
  "total": 25,
  "page": 1,
  "totalPages": 2
}
```

### Mark as Read
```http
PATCH /notifications/:id/read
Authorization: Bearer <token>
```

### Mark All as Read
```http
PATCH /notifications/read-all
Authorization: Bearer <token>
```

### Delete Notification
```http
DELETE /notifications/:id
Authorization: Bearer <token>
```

---

## ☕ Café - Time Slots

### Create Time Slot (Café Manager)
```http
POST /timeslotes
Authorization: Bearer <token>
Content-Type: application/json

{
  "date": "2026-03-15",
  "startTime": "10:00",
  "endTime": "11:00",
  "capacity": 20
}
```

### Get All Time Slots
```http
GET /timeslotes?date=2026-03-15
Authorization: Bearer <token>
```

### Get Slot Details
```http
GET /timeslotes/:id
Authorization: Bearer <token>
```

### Update Time Slot (Café Manager)
```http
PUT /timeslotes/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "capacity": 25
}
```

### Delete Time Slot (Café Manager)
```http
DELETE /timeslotes/:id
Authorization: Bearer <token>
```

---

## ☕ Café - Reservations

### Create Reservation (Student)
```http
POST /reservations
Authorization: Bearer <token>
Content-Type: application/json

{
  "timeSlotId": "slot_id"
}
```

### Get My Reservations
```http
GET /reservations/my
Authorization: Bearer <token>
```

### Cancel Reservation
```http
DELETE /reservations/:reservationId
Authorization: Bearer <token>
```

### Get Slot Bookings (Café Manager)
```http
GET /reservations/slot/:slotId
Authorization: Bearer <token>
```

---

## 🛒 Marketplace

### Create Listing (Student)
```http
POST /marketplace
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "Used Textbook",
  "description": "Calculus textbook in good condition",
  "price": 25.99,
  "category": "books",
  "images": [<file1>, <file2>]
}
```

### Get All Listings
```http
GET /marketplace?page=1&limit=10&search=book&category=books&department=dept_id
Authorization: Bearer <token>
```

### Get My Listings
```http
GET /marketplace/my
Authorization: Bearer <token>
```

### Get Single Listing
```http
GET /marketplace/:id
Authorization: Bearer <token>
```

### Mark as Sold
```http
PATCH /marketplace/:id/sold
Authorization: Bearer <token>
```

### Update Listing
```http
PUT /marketplace/:id
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "Updated Title",
  "price": 20.00
}
```

### Delete Listing
```http
DELETE /marketplace/:id
Authorization: Bearer <token>
```

---

## 📝 User Roles

- **STUDENT**: Can create reservations, marketplace listings, view announcements
- **ADMIN**: Full access, can create announcements, manage all content
- **CAFE_MANAGER**: Can manage time slots and view bookings

---

## 🎯 Response Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (no token or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Server Error

---

## 📦 File Upload Limits

- Max file size: 5MB
- Allowed types: Images only (jpg, png, gif, etc.)
- Max images per marketplace listing: 5
- Profile image: 1 file
- Announcement image: 1 file

---

## 🔍 Query Parameters

### Pagination
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

### Filtering
- `search` - Search term
- `category` - Filter by category
- `department` - Filter by department
- `date` - Filter by date (for time slots)

---

## 💡 Tips

1. Always include the Authorization header for protected routes
2. Use multipart/form-data for file uploads
3. Check response status codes for error handling
4. Implement proper error handling on the client side
5. Store JWT token securely (localStorage or httpOnly cookies)
