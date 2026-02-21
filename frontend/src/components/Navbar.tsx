import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Campus App
          </Link>

          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                  Dashboard
                </Link>
                <Link to="/announcements" className="text-gray-700 hover:text-blue-600">
                  Announcements
                </Link>
                <Link to="/cafe" className="text-gray-700 hover:text-blue-600">
                  Cafe
                </Link>
                <Link to="/cafe/bookings" className="text-gray-700 hover:text-blue-600">
                  My Bookings
                </Link>
                <Link to="/marketplace" className="text-gray-700 hover:text-blue-600">
                  Marketplace
                </Link>
                <span className="text-gray-600">Hi, {user?.name}</span>
                <Button onClick={handleLogout} variant="secondary" size="sm">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="secondary" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
