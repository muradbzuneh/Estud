# Admin Dashboard & Notifications Guide

## New Features Added

### 1. Notification Icon
- Bell icon in the navbar showing unread notification count
- Dropdown panel displaying all notifications
- Click notifications to navigate to related content
- Auto-refreshes every 30 seconds
- Visual indicators for unread notifications

### 2. Admin Dashboard
- Accessible only to users with 'admin' role
- Located at `/admin` route
- Tabbed interface for different management sections:
  - **Announcements**: Create new announcements
  - **Cafe Management**: (Coming soon)
  - **Marketplace**: (Coming soon)

## Usage

### For Admin Users
1. Login with an admin account
2. Click "Admin" in the navbar
3. Use the tabs to switch between management sections
4. Create announcements using the form

### For All Users
1. Look for the bell icon in the navbar
2. Red badge shows unread notification count
3. Click to view all notifications
4. Click any notification to view details
5. Unread notifications have a blue background

## API Endpoints Used

### Notifications
- `GET /notify` - Get user's notifications
- `PATCH /notify/:id/read` - Mark notification as read
- `GET /notify/unread/count` - Get unread count

### Announcements (Admin)
- `POST /announcment` - Create new announcement

## Files Created
- `frontend/src/services/notificationService.ts`
- `frontend/src/components/NotificationIcon.tsx`
- `frontend/src/pages/admin/AdminDashboard.tsx`

## Files Modified
- `frontend/src/App.tsx` - Added admin route
- `frontend/src/components/Navbar.tsx` - Added notification icon and admin link
- `frontend/src/types/index.ts` - Added Notification type
