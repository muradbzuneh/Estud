# Role-Based Access Control (RBAC) - Estud Platform

## 🎭 User Roles

The system has **3 distinct roles**:

1. **STUDENT** - Regular users who can book café slots, buy/sell items, view announcements
2. **ADMIN** - System administrators who manage announcements and moderate content
3. **CAFE_MANAGER** - Staff who manage café time slots and view bookings

---

## 👤 STUDENT Role

### ✅ What Students CAN Do

#### Authentication
- ✅ Register with student ID, email, password, department
- ✅ Login to the system
- ✅ View their own profile
- ✅ Update their own profile (future feature)

#### Announcements (Read-Only)
- ✅ View all announcements (filtered by their department)
- ✅ View announcement details
- ✅ See read/unread status
- ✅ Mark announcements as read (automatic)
- ✅ Filter announcements by category
- ✅ Search announcements

#### Café Reservations
- ✅ View available time slots
- ✅ See real-time seat availability
- ✅ Book available time slots
- ✅ View their own reservations
- ✅ Cancel their own reservations (before slot time)
- ✅ Filter slots by date

#### Marketplace (Seller & Buyer)
- ✅ Create item listings (max 5 active)
- ✅ Upload images for listings (max 5 per item)
- ✅ View all marketplace items
- ✅ View their own listings
- ✅ Update their own listings
- ✅ Mark their own items as sold
- ✅ Delete their own listings
- ✅ Filter items by department/category
- ✅ Search for items
- ✅ View seller contact information

### ❌ What Students CANNOT Do

#### Announcements
- ❌ Create announcements
- ❌ Edit announcements
- ❌ Delete announcements
- ❌ Send notifications

#### Café Management
- ❌ Create time slots
- ❌ Update time slots
- ❌ Delete time slots
- ❌ View all bookings for a slot
- ❌ View other students' reservations

#### Marketplace
- ❌ Edit other students' listings
- ❌ Delete other students' listings
- ❌ Mark other students' items as sold
- ❌ View other students' personal data (except name/email)
- ❌ Create more than 5 active listings

#### System
- ❌ Access admin dashboard
- ❌ Manage users
- ❌ Change roles
- ❌ View system logs

---

## 👨‍💼 ADMIN Role

### ✅ What Admins CAN Do

#### Authentication
- ✅ Login to the system
- ✅ View their own profile

#### Announcements (Full Control)
- ✅ Create announcements with:
  - Title, content, image
  - Target group (UNIVERSITY/DEPARTMENT/CLASS)
  - Expiration date
  - Importance flag
- ✅ View all announcements
- ✅ Update any announcement
- ✅ Delete any announcement
- ✅ Upload images for announcements

#### Marketplace (Moderation)
- ✅ View all marketplace items
- ✅ Delete inappropriate listings (any user's)
- ✅ View all item details

#### Café (Same as Café Manager)
- ✅ Create time slots
- ✅ Update time slots
- ✅ Delete time slots
- ✅ View all bookings for any slot

### ❌ What Admins CANNOT Do

#### Café Reservations
- ❌ Book time slots (not a student)
- ❌ Cancel student reservations (students must cancel themselves)

#### Marketplace
- ❌ Create listings (not a student)
- ❌ Edit other users' listings (only delete)
- ❌ Mark other users' items as sold

---

## ☕ CAFE_MANAGER Role

### ✅ What Café Managers CAN Do

#### Authentication
- ✅ Login to the system
- ✅ View their own profile

#### Time Slot Management (Full Control)
- ✅ Create time slots with:
  - Date, start time, end time
  - Capacity (seat limit)
- ✅ View all time slots
- ✅ Update time slots
- ✅ Delete time slots (if no active bookings)

#### Booking Management (View-Only)
- ✅ View all bookings for any slot
- ✅ See student details (name, email, student ID)
- ✅ See total bookings per slot
- ✅ Export booking lists (future feature)

#### Announcements (Read-Only)
- ✅ View all announcements

### ❌ What Café Managers CANNOT Do

#### Announcements
- ❌ Create announcements
- ❌ Edit announcements
- ❌ Delete announcements

#### Reservations
- ❌ Book slots (not a student)
- ❌ Cancel student reservations
- ❌ Modify student reservations

#### Marketplace
- ❌ Create listings
- ❌ Edit listings
- ❌ Delete listings
- ❌ View marketplace (future: may be allowed)

---

## 🔒 Data Privacy & Ownership

### Personal Data Access

#### Students Can See:
- ✅ Their own full profile (name, email, student ID, department)
- ✅ Their own reservations
- ✅ Their own marketplace listings
- ✅ Other students' public info (name, email) on marketplace items
- ❌ Other students' student IDs (except on their own listings)
- ❌ Other students' reservations
- ❌ Other students' personal listings

#### Admins Can See:
- ✅ All announcements
- ✅ All marketplace items
- ✅ Seller information on marketplace items
- ❌ Student reservations (unless also CAFE_MANAGER)
- ❌ Student passwords (hashed)

#### Café Managers Can See:
- ✅ All time slots
- ✅ All reservations with student details (name, email, student ID)
- ❌ Student passwords (hashed)
- ❌ Marketplace data
- ❌ Announcement creation details

### Ownership Rules

#### Marketplace Items
```typescript
// Owner verification in controller
const item = await MarketplaceItem.findOne({
  _id: id,
  createdBy: userId  // Must be the creator
});

if (!item) {
  return res.status(404).json({ 
    message: "Item not found or you don't have permission" 
  });
}
```

**Rules:**
- ✅ Students can only edit/delete their own listings
- ✅ Admins can delete any listing (moderation)
- ❌ Students cannot edit other students' listings

#### Reservations
```typescript
// Owner verification in controller
const reservation = await Reservation.findOne({
  _id: reservationId,
  user: req.userId,  // Must be the owner
  status: "confirmed"
});
```

**Rules:**
- ✅ Students can only view/cancel their own reservations
- ❌ Students cannot see other students' reservations
- ✅ Café managers can view all reservations (for management)

---

## 🛡️ Security Measures

### 1. Route-Level Protection

```typescript
// Example: Only students can create listings
router.post("/", 
  authenticate,                    // Must be logged in
  authorize(["STUDENT"]),          // Must be STUDENT role
  upload.array('images', 5),       // Max 5 images
  createItem
);
```

### 2. Controller-Level Verification

```typescript
// Example: Owner verification for updates
const item = await MarketplaceItem.findOneAndUpdate(
  { _id: id, createdBy: userId },  // Must own the item
  updates,
  { new: true, runValidators: true }
);
```

### 3. Business Logic Constraints

```typescript
// Example: Max 5 active listings per student
const activeCount = await MarketplaceItem.countDocuments({
  createdBy: userId,
  isActive: true,
  isSold: false
});

if (activeCount >= 5) {
  return res.status(400).json({
    message: "You have reached the maximum of 5 active listings"
  });
}
```

---

## 📊 Permission Matrix

| Feature | Student | Admin | Café Manager |
|---------|---------|-------|--------------|
| **Authentication** |
| Register | ✅ | ❌ | ❌ |
| Login | ✅ | ✅ | ✅ |
| View Own Profile | ✅ | ✅ | ✅ |
| **Announcements** |
| View | ✅ | ✅ | ✅ |
| Create | ❌ | ✅ | ❌ |
| Update | ❌ | ✅ | ❌ |
| Delete | ❌ | ✅ | ❌ |
| **Café Slots** |
| View | ✅ | ✅ | ✅ |
| Create | ❌ | ✅ | ✅ |
| Update | ❌ | ✅ | ✅ |
| Delete | ❌ | ✅ | ✅ |
| **Reservations** |
| Book Slot | ✅ | ❌ | ❌ |
| View Own | ✅ | ❌ | ❌ |
| Cancel Own | ✅ | ❌ | ❌ |
| View All | ❌ | ✅ | ✅ |
| **Marketplace** |
| View Items | ✅ | ✅ | ❌ |
| Create Listing | ✅ | ❌ | ❌ |
| Update Own | ✅ | ❌ | ❌ |
| Delete Own | ✅ | ❌ | ❌ |
| Delete Any | ❌ | ✅ | ❌ |
| Mark as Sold | ✅ (own) | ❌ | ❌ |

---

## 🔐 API Endpoint Access Control

### Public Endpoints (No Auth Required)
- None (all endpoints require authentication)

### Student-Only Endpoints
```
POST   /api/reservations              - Book slot
GET    /api/reservations/my           - View own bookings
DELETE /api/reservations/:id          - Cancel own booking
POST   /api/marketplace               - Create listing
GET    /api/marketplace/my            - View own listings
PATCH  /api/marketplace/:id/sold      - Mark own item as sold
PUT    /api/marketplace/:id           - Update own listing
```

### Admin-Only Endpoints
```
POST   /api/announcment               - Create announcement
PUT    /api/announcment/:id           - Update announcement
DELETE /api/announcment/:id           - Delete announcement
```

### Café Manager + Admin Endpoints
```
POST   /api/timeslotes                - Create time slot
PUT    /api/timeslotes/:id            - Update time slot
DELETE /api/timeslotes/:id            - Delete time slot
GET    /api/reservations/slot/:id     - View slot bookings
```

### All Authenticated Users
```
GET    /api/students/profile          - View own profile
GET    /api/announcment               - View announcements
GET    /api/announcment/:id           - View announcement details
GET    /api/timeslotes                - View time slots
GET    /api/timeslotes/:id            - View slot details
GET    /api/marketplace               - View marketplace items
GET    /api/marketplace/:id           - View item details
```

---

## 🎯 Use Case Examples

### Use Case 1: Student Posts Item for Sale

**Scenario:** Alice wants to sell her textbook

1. ✅ Alice logs in as STUDENT
2. ✅ Navigates to marketplace
3. ✅ Clicks "Create Listing"
4. ✅ Fills in: Title, Description, Price, Category
5. ✅ Uploads images (max 5)
6. ✅ System auto-assigns her department
7. ✅ Item is created and visible to all users
8. ✅ Alice can see it in "My Listings"

**What Alice CANNOT do:**
- ❌ Edit Bob's listings
- ❌ Delete Bob's listings
- ❌ Create more than 5 active listings
- ❌ Post without being logged in

### Use Case 2: Student Buys Item

**Scenario:** Bob wants to buy Alice's textbook

1. ✅ Bob logs in as STUDENT
2. ✅ Browses marketplace
3. ✅ Filters by his department
4. ✅ Finds Alice's textbook
5. ✅ Views item details
6. ✅ Sees Alice's contact info (name, email)
7. ✅ Contacts Alice directly (outside system)

**What Bob CANNOT do:**
- ❌ Mark Alice's item as sold
- ❌ Edit Alice's listing
- ❌ See Alice's student ID
- ❌ See Alice's other personal data

### Use Case 3: Admin Moderates Content

**Scenario:** Admin finds inappropriate listing

1. ✅ Admin logs in
2. ✅ Views all marketplace items
3. ✅ Finds inappropriate listing
4. ✅ Deletes the listing (soft delete)
5. ✅ Item is hidden from all users

**What Admin CANNOT do:**
- ❌ Edit the listing (only delete)
- ❌ Create marketplace listings
- ❌ Book café slots

### Use Case 4: Café Manager Creates Slot

**Scenario:** Manager creates lunch slots

1. ✅ Manager logs in as CAFE_MANAGER
2. ✅ Navigates to time slot management
3. ✅ Creates slot: Date, 12:00-12:30, Capacity: 20
4. ✅ Slot is visible to all students
5. ✅ Students can now book this slot

**What Manager CANNOT do:**
- ❌ Book the slot themselves
- ❌ Cancel student reservations
- ❌ Create announcements

---

## ✅ Security Checklist

- ✅ All routes require authentication
- ✅ Role-based authorization on sensitive endpoints
- ✅ Owner verification for updates/deletes
- ✅ Business logic constraints (max listings, etc.)
- ✅ Password hashing (bcrypt)
- ✅ JWT token authentication
- ✅ Input validation
- ✅ SQL injection prevention (Mongoose)
- ✅ XSS prevention (input sanitization)
- ✅ CORS enabled
- ✅ File upload restrictions (type, size, count)

---

## 🚀 Summary

The RBAC system ensures:
1. **Students** can only manage their own data
2. **Admins** can moderate content but not impersonate students
3. **Café Managers** can manage slots but not student data
4. **Privacy** is maintained - users only see what they should
5. **Security** is enforced at multiple levels (route, controller, business logic)

All access control is properly implemented and tested! 🎉
