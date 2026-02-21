import { useEffect, useState } from 'react';
import Card from '../../components/Card';
import { cafeService } from '../../services/cafeService';
import { Reservation } from '../../types';

export default function BookingList() {
  const [bookings, setBookings] = useState<Reservation[]>([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await cafeService.getReservations();
      setBookings(data);
    } catch (err) {
      console.error('Failed to load bookings');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      <div className="grid gap-4">
        {bookings.map((booking) => (
          <Card key={booking._id}>
            <p className="font-semibold">Reservation #{booking._id}</p>
            <p className="text-sm text-gray-600">Status: {booking.status}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
