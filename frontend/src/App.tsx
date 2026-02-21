import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import AnnouncementList from './pages/announcements/AnnouncementList';
import AnnouncementDetail from './pages/announcements/AnnouncementDetail';
import SlotList from './pages/cafe/SlotList';
import BookingList from './pages/cafe/BookingList';
import MarketplaceList from './pages/marketplace/MarketplaceList';
import ItemDetail from './pages/marketplace/ItemDetail';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/announcements" element={<AnnouncementList />} />
          <Route path="/announcements/:id" element={<AnnouncementDetail />} />
          <Route path="/cafe" element={<SlotList />} />
          <Route path="/cafe/bookings" element={<BookingList />} />
          <Route path="/marketplace" element={<MarketplaceList />} />
          <Route path="/marketplace/:id" element={<ItemDetail />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}