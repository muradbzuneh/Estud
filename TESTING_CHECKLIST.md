# Testing Checklist

Use this checklist to verify all features are working correctly.

## 🔧 Setup Verification

- [ ] Backend server starts without errors (`npm run dev` in backend/)
- [ ] Frontend server starts without errors (`npm run dev` in frontend/)
- [ ] MongoDB connection successful
- [ ] Environment variables loaded correctly
- [ ] No TypeScript compilation errors

---

## 🔐 Authentication & Users

### Registration
- [ ] Register as STUDENT with all required fields
- [ ] Register as ADMIN
- [ ] Register as CAFE_MANAGER
- [ ] Validation errors show for missing fields
- [ ] Duplicate email shows error
- [ ] Department is required for STUDENT role

### Login
- [ ] Login with valid credentials
- [ ] Login fails with wrong password
- [ ] Login fails with non-existent email
- [ ] JWT token is returned
- [ ] User role is included in response

### Profile
- [ ] Get profile with valid token
- [ ] Profile shows user details and department
- [ ] Update profile name
- [ ] Upload profile image
- [ ] Unauthorized without token

---

## 🏢 Departments

- [ ] Create new department (Admin)
- [ ] Duplicate department name shows error
- [ ] Get all departments (any user)
- [ ] Departments sorted alphabetically

---

## 📢 Announcements

### Create (Admin Only)
- [ ] Create announcement for UNIVERSITY
- [ ] Create announcement for DEPARTMENT
- [ ] Create announcement for CLASS
- [ ] Upload image with announcement
- [ ] Set expiration date
- [ ] Mark as important
- [ ] Validation for required fields
- [ ] Department required for DEPARTMENT/CLASS target

### View (All Users)
- [ ] Get all announcements
- [ ] Filter by search term
- [ ] Filter by category (targetGroup)
- [ ] Pagination works correctly
- [ ] Expired announcements not shown
- [ ] Important announcements shown first
- [ ] Read status tracked per user

### Single Announcement
- [ ] Get announcement details
- [ ] Announcement marked as read when viewed
- [ ] Image displayed correctly

### Update/Delete (Admin Only)
- [ ] Update announcement details
- [ ] Update announcement image
- [ ] Delete announcement (soft delete)
- [ ] Non-admin cannot update/delete

---

## 🔔 Notifications

- [ ] Get user notifications
- [ ] Pagination works
- [ ] Unread count displayed correctly
- [ ] Mark single notification as read
- [ ] Mark all notifications as read
- [ ] Delete notification
- [ ] Notifications created when announcement posted
- [ ] Notifications filtered by user

---

## ☕ Café - Time Slots

### Create (Café Manager Only)
- [ ] Create time slot with valid data
- [ ] Capacity must be at least 1
- [ ] Duplicate slot shows error
- [ ] Available seats initialized to capacity
- [ ] Non-manager cannot create slots

### View (All Users)
- [ ] Get all active time slots
- [ ] Filter by date
- [ ] Only future slots shown
- [ ] Slots sorted by date and time
- [ ] Available seats shown correctly
- [ ] isFull flag accurate

### Update/Delete (Café Manager Only)
- [ ] Update slot capacity
- [ ] Update slot time
- [ ] Delete slot (deactivate)
- [ ] Cannot delete slot with active reservations
- [ ] Non-manager cannot update/delete

---

## ☕ Café - Reservations

### Create (Student Only)
- [ ] Book available slot
- [ ] Available seats decrease by 1
- [ ] Cannot book full slot
- [ ] Cannot book overlapping slots
- [ ] Cannot book same slot twice
- [ ] Non-student cannot book

### View
- [ ] Get my reservations
- [ ] Reservations sorted by date
- [ ] Slot details populated
- [ ] Status shown correctly

### Cancel
- [ ] Cancel future reservation
- [ ] Available seats increase by 1
- [ ] Cannot cancel past reservation
- [ ] Cannot cancel already cancelled reservation
- [ ] Only owner can cancel

### Manager View
- [ ] Get bookings for specific slot
- [ ] Student details shown
- [ ] Total bookings count correct
- [ ] Only manager/admin can view

---

## 🛒 Marketplace

### Create Listing (Student Only)
- [ ] Create listing with required fields
- [ ] Upload multiple images (max 5)
- [ ] Category validation
- [ ] Price must be positive
- [ ] Department auto-assigned from user
- [ ] Cannot create more than 5 active listings
- [ ] Non-student cannot create listing

### View Listings
- [ ] Get all active listings
- [ ] Filter by search term
- [ ] Filter by category
- [ ] Filter by department
- [ ] Pagination works
- [ ] Sold items not shown (unless filtered)
- [ ] Images displayed correctly

### Single Listing
- [ ] Get listing details
- [ ] Creator details shown
- [ ] Department shown
- [ ] Contact information visible

### Update Listing
- [ ] Update title, description, price
- [ ] Update images
- [ ] Only owner can update
- [ ] Validation works

### Mark as Sold
- [ ] Owner can mark as sold
- [ ] Item removed from active listings
- [ ] Non-owner cannot mark as sold

### Delete Listing
- [ ] Owner can delete own listing
- [ ] Admin can delete any listing
- [ ] Soft delete (isActive = false)
- [ ] Non-owner/non-admin cannot delete

---

## 🔒 Authorization Tests

### Student Role
- [ ] Can create reservations
- [ ] Can create marketplace listings
- [ ] Can view announcements
- [ ] Cannot create announcements
- [ ] Cannot create time slots
- [ ] Cannot view all bookings

### Admin Role
- [ ] Can create announcements
- [ ] Can delete any marketplace listing
- [ ] Can view all data
- [ ] Full access to all endpoints

### Café Manager Role
- [ ] Can create time slots
- [ ] Can view slot bookings
- [ ] Can update/delete slots
- [ ] Cannot create announcements
- [ ] Cannot create marketplace listings

---

## 🖼️ File Upload Tests

- [ ] Upload profile image (max 5MB)
- [ ] Upload announcement image (max 5MB)
- [ ] Upload marketplace images (max 5 images, 5MB each)
- [ ] Non-image files rejected
- [ ] Files over 5MB rejected
- [ ] Images accessible via /uploads/ URL

---

## 🔍 Search & Filter Tests

### Announcements
- [ ] Search by title
- [ ] Filter by targetGroup
- [ ] Pagination with filters

### Marketplace
- [ ] Search by title
- [ ] Filter by category
- [ ] Filter by department
- [ ] Pagination with filters

### Time Slots
- [ ] Filter by date
- [ ] Only future slots

---

## ⚠️ Error Handling Tests

- [ ] Invalid token returns 401
- [ ] Missing token returns 401
- [ ] Insufficient permissions returns 403
- [ ] Not found returns 404
- [ ] Validation errors return 400
- [ ] Server errors return 500
- [ ] Error messages are clear

---

## 🌐 Frontend Tests

### Navigation
- [ ] All routes accessible
- [ ] Protected routes redirect to login
- [ ] Navbar shows correct links based on role
- [ ] Logout works correctly

### Forms
- [ ] All forms validate input
- [ ] Error messages displayed
- [ ] Success messages displayed
- [ ] Loading states shown

### Components
- [ ] NotificationIcon shows unread count
- [ ] Images load correctly
- [ ] Buttons work as expected
- [ ] Responsive design works

---

## 🚀 Performance Tests

- [ ] Page load time acceptable
- [ ] API response time < 500ms
- [ ] Images load efficiently
- [ ] Pagination doesn't load all data
- [ ] Database queries optimized

---

## 📱 Cross-Browser Tests

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

---

## 🔄 Concurrent Operations

- [ ] Multiple users booking same slot (first-come-first-served)
- [ ] Slot capacity decreases correctly
- [ ] No race conditions
- [ ] Transaction rollback on error

---

## 📊 Data Integrity

- [ ] Deleted items not shown
- [ ] Expired announcements not shown
- [ ] Cancelled reservations don't count
- [ ] Sold items marked correctly
- [ ] Read status tracked per user

---

## 🎯 Edge Cases

- [ ] Empty search results
- [ ] No notifications
- [ ] No reservations
- [ ] No marketplace items
- [ ] Full time slot
- [ ] Expired announcement
- [ ] Past reservation
- [ ] Maximum listings reached

---

## ✅ Final Checks

- [ ] All features working
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] No broken links
- [ ] All images load
- [ ] Mobile responsive
- [ ] Documentation accurate
- [ ] Environment variables set

---

## 📝 Notes

Use this space to note any issues found during testing:

```
Issue 1:
- Description:
- Steps to reproduce:
- Expected behavior:
- Actual behavior:

Issue 2:
- Description:
- Steps to reproduce:
- Expected behavior:
- Actual behavior:
```

---

**Testing Date**: _______________  
**Tested By**: _______________  
**Status**: [ ] Pass [ ] Fail  
**Notes**: _______________
