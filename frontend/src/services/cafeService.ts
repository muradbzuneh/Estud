import api from '../utils/api';

export const cafeService = {
  // Get available time slots with optional date filter
  getSlots: async (date?: string) => {
    const params = date ? { date } : {};
    const { data } = await api.get('/timeslotes', { params });
    return data;
  },

  // Get single slot details
  getSlotById: async (slotId: string) => {
    const { data } = await api.get(`/timeslotes/${slotId}`);
    return data;
  },

  // Create reservation (FR-10)
  createReservation: async (timeSlotId: string) => {
    const { data } = await api.post('/reservations', { timeSlotId });
    return data;
  },

  // Get my reservations (FR-10)
  getMyReservations: async () => {
    const { data } = await api.get('/reservations/my');
    return data;
  },

  // Cancel reservation (FR-12)
  cancelReservation: async (reservationId: string) => {
    const { data } = await api.delete(`/reservations/${reservationId}`);
    return data;
  },

  // Café Manager: Create time slot (FR-8)
  createTimeSlot: async (slotData: {
    date: string;
    startTime: string;
    endTime: string;
    capacity: number;
  }) => {
    const { data } = await api.post('/timeslotes', slotData);
    return data;
  },

  // Café Manager: Get bookings for a slot (FR-14)
  getSlotBookings: async (slotId: string) => {
    const { data } = await api.get(`/reservations/slot/${slotId}`);
    return data;
  },

  // Café Manager: Update time slot
  updateTimeSlot: async (slotId: string, updates: any) => {
    const { data } = await api.put(`/timeslotes/${slotId}`, updates);
    return data;
  },

  // Café Manager: Delete time slot
  deleteTimeSlot: async (slotId: string) => {
    const { data } = await api.delete(`/timeslotes/${slotId}`);
    return data;
  }
};
