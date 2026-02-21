import { useEffect, useState } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { cafeService } from '../../services/cafeService';
import { TimeSlot } from '../../types';
import { formatDate } from '../../utils/formatDate';

export default function SlotList() {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSlots();
  }, []);

  const loadSlots = async () => {
    try {
      setLoading(true);
      const data = await cafeService.getSlots();
      setSlots(data);
    } catch (err) {
      console.error('Failed to load slots');
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (slotId: string) => {
    try {
      await cafeService.createReservation(slotId);
      alert('Booking successful!');
      loadSlots();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to book slot');
    }
  };

  if (loading) return <div className="container mx-auto p-6">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available Time Slots</h1>
      <div className="grid gap-4">
        {slots.map((slot) => (
          <Card key={slot._id}>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{formatDate(slot.date)}</p>
                <p className="text-sm text-gray-600">
                  {slot.startTime} - {slot.endTime}
                </p>
                <p className="text-sm text-gray-600">
                  Available: {slot.availableSeats} / {slot.capacity}
                </p>
              </div>
              <Button 
                onClick={() => handleBook(slot._id)}
                disabled={slot.availableSeats === 0}
              >
                {slot.availableSeats === 0 ? 'Full' : 'Book'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
