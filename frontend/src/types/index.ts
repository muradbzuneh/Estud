// User & Auth Types
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'ADMIN' | 'CAFE_MANAGER';
  studentId?: string;
  departmentId?: string;
  department?: Department;
  profileImage?: string;
}

export interface Department {
  _id: string;
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  studentId?: string;
  departmentId?: string;
  role?: 'STUDENT' | 'ADMIN' | 'CAFE_MANAGER';
}

// Announcement Types (FR-4 to FR-7)
export interface Announcement {
  _id: string;
  title: string;
  content: string;
  image?: string;
  targetGroup: 'UNIVERSITY' | 'DEPARTMENT' | 'CLASS';
  department?: Department;
  createdBy: User;
  isImportant: boolean;
  expiresAt: string;
  isActive: boolean;
  isRead?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Café Types (FR-8 to FR-14)
export interface TimeSlot {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  availableSeats: number;
  isActive: boolean;
  isFull?: boolean;
  bookingEnabled?: boolean;
  currentBookings?: number;
  remainingSeats?: number;
}

export interface Reservation {
  _id: string;
  user: User;
  timeSlot: TimeSlot;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}

// Marketplace Types (FR-15 to FR-18)
export interface MarketplaceItem {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: 'books' | 'electronics' | 'drawing-material' | 'other';
  department: Department;
  images?: string[];
  createdBy: User;
  isSold: boolean;
  isActive: boolean;
  status?: string;
  createdAt: string;
}

// Notification Types
export interface Notification {
  _id: string;
  user: string;
  title: string;
  message: string;
  type: 'announcement' | 'reservation' | 'marketplace';
  referenceId?: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}
