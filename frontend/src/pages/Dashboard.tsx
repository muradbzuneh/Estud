import { Link } from 'react-router-dom';
import Card from '../components/Card';

export default function Dashboard() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/announcements">
          <Card>
            <h2 className="text-xl font-semibold">Announcements</h2>
            <p className="text-gray-600">View latest updates</p>
          </Card>
        </Link>
        <Link to="/cafe">
          <Card>
            <h2 className="text-xl font-semibold">Cafe Booking</h2>
            <p className="text-gray-600">Reserve your slot</p>
          </Card>
        </Link>
        <Link to="/marketplace">
          <Card>
            <h2 className="text-xl font-semibold">Marketplace</h2>
            <p className="text-gray-600">Browse items</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
