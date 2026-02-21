// User & Auth Types
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  department?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'admin';
  department?: string;
}

// Announcement Types
export interface Announcement {
  _id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
}

// Cafe Types
export interface TimeSlot {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  availableSeats: number;
}

export interface Reservation {
  _id: string;
  user: User;
  timeSlot: TimeSlot;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

// Marketplace Types
export interface MarketplaceItem {
  _id: string;
  title: string;
  description: string;
  price: number;
  seller: User;
  images?: string[];
  category: string;
  status: 'available' | 'sold';
  createdAt: string;
}
