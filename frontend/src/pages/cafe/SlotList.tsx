import { useEffect, useState } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { cafeService } from '../../services/cafeService';
import { TimeSlot } from '../../types';

export default function SlotList() {
  const [slots, setSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    loadSlots();
  }, []);

  const loadSlots = async () => {
    try {
      const data = await cafeService.getSlots();
      setSlots(data);
    } catch (err) {
      console.error('Failed to load slots');
    }
  };

  const handleBook = async (slotId: string) => {
    try {
      await cafeService.createReservation(slotId);
      loadSlots();
    } catch (err) {
      console.error('Failed to book slot');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available Time Slots</h1>
      <div className="grid gap-4">
        {slots.map((slot) => (
          <Card key={slot._id}>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{slot.startTime} - {slot.endTime}</p>
                <p className="text-sm text-gray-600">Available: {slot.availableSeats}</p>
              </div>
              <Button onClick={() => handleBook(slot._id)}>Book</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
