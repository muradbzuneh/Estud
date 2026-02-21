import api from '../utils/api';

export const cafeService = {
  getSlots: async () => {
    const { data } = await api.get('/cafe/timeslots');
    return data;
  },

  createReservation: async (slotId: string) => {
    const { data } = await api.post('/cafe/reservations', { slotId });
    return data;
  },

  getReservations: async () => {
    const { data } = await api.get('/cafe/reservations');
    return data;
  }
};
