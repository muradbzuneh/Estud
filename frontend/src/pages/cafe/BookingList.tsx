import { useEffect, useState } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { cafeService } from '../../services/cafeService';
import type { Reservation } from '../../types';
import { formatDate } from '../../utils/formatDate';

export default function BookingList() {
  const [bookings, setBookings] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const data = await cafeService.getMyReservations();
      setBookings(data);
    } catch (err) {
      console.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (reservationId: string) => {
    if (!confirm('Are you sure you want to cancel this reservation?')) return;
    
    try {
      await cafeService.cancelReservation(reservationId);
      alert('Reservation cancelled');
      loadBookings();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to cancel reservation');
    }
  };

  if (loading) return <div className="container mx-auto p-6">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      <div className="grid gap-4">
        {bookings.length === 0 ? (
          <p className="text-gray-600">No bookings found</p>
        ) : (
          bookings.map((booking) => (
            <Card key={booking._id}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">
                    {formatDate(booking.timeSlot.date)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {booking.timeSlot.startTime} - {booking.timeSlot.endTime}
                  </p>
                  <p className="text-sm">
                    Status: <span className={`font-semibold ${
                      booking.status === 'confirmed' ? 'text-green-600' : 
                      booking.status === 'cancelled' ? 'text-red-600' : 
                      'text-yellow-600'
                    }`}>{booking.status}</span>
                  </p>
                </div>
                {booking.status !== 'cancelled' && (
                  <Button onClick={() => handleCancel(booking._id)}>
                    Cancel
                  </Button>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
