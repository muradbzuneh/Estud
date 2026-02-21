import api from '../utils/api';

export const announcementService = {
  getAll: async () => {
    const { data } = await api.get('/announcment');
     return data.announcements;
  },

  getById: async (id: string) => {
    const { data } = await api.get(`/announcment/${id}`);
    return data;
  },

  create: async (announcementData: any) => {
    const { data } = await api.post('/announcment', announcementData);
    return data;
  }
};
