import api from '../utils/api';

export const cafeService = {
  getSlots: async () => {
    const { data } = await api.get('/timeslotes');
    return data;
  },

  createReservation: async (timeSlotId: string) => {
    const { data } = await api.post('/reservations', { timeSlotId });
    return data;
  },

  getMyReservations: async () => {
    const { data } = await api.get('/reservations/my');
    return data;
  },

  cancelReservation: async (reservationId: string) => {
    const { data } = await api.delete(`/reservations/${reservationId}`);
    return data;
  }
};
