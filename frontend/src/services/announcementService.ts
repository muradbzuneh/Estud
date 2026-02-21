import api from '../utils/api';

export const announcementService = {
  getAll: async () => {
    const { data } = await api.get('/announcements');
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get(`/announcements/${id}`);
    return data;
  },

  create: async (announcementData: any) => {
    const { data } = await api.post('/announcements', announcementData);
    return data;
  }
};
