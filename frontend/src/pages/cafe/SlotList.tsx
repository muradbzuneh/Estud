import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { cafeService } from "../../services/cafeService";
import type { TimeSlot } from "../../types";
import { formatDate } from "../../utils/formatDate";
import { useAuth } from "../../context/AuthContext";

export default function SlotList() {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadSlots();
  }, []);

  const loadSlots = async () => {
    try {
      setLoading(true);
      const data = await cafeService.getSlots();
      setSlots(data);
    } catch (err) {
      console.error("Failed to load slots");
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (slotId: string) => {
    try {
      await cafeService.createReservation(slotId);
      alert("Booking successful!");
      loadSlots();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to book slot");
    }
  };

  if (loading) return <div className="container mx-auto p-6">Loading...</div>;

  return (
    <div className="container mx-auto p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Cafe Time Slots</h1>

        {user?.role === "ADMIN" && (
          <Button onClick={() => navigate("/cafe/create")}>
            + Create Slot
          </Button>
        )}
      </div>

      {/* SLOT LIST */}
      <div className="grid gap-4">
        {slots.length === 0 ? (
          <p>No slots available</p>
        ) : (
          slots.map((slot) => (
            <Card key={slot._id}>
              <div className="flex justify-between items-center">

                <div>
                  <p className="font-semibold">
                    {formatDate(slot.date)}
                  </p>

                  <p className="text-sm text-gray-600">
                    {slot.startTime} - {slot.endTime}
                  </p>

                  <p className="text-sm text-gray-600">
                    Available: {slot.availableSeats} / {slot.capacity}
                  </p>

                  <p className="text-sm text-gray-500">
                    Status: {slot.isActive ? "Active" : "Inactive"}
                  </p>
                </div>

                {/* STUDENT BOOK BUTTON */}
                {user?.role === "STUDENT" && (
                  <Button
                    onClick={() => handleBook(slot._id)}
                    disabled={slot.availableSeats === 0}
                  >
                    {slot.availableSeats === 0 ? "Full" : "Book"}
                  </Button>
                )}

                {/* ADMIN VIEW ONLY */}
                {user?.role === "ADMIN" && (
                  <span className="text-blue-600 font-semibold">
                    Admin View
                  </span>
                )}

              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}