import api from '../utils/api';

export const marketplaceService = {
  getAll: async (params?: { search?: string; category?: string; page?: number }) => {
    const { data } = await api.get('/marketplace', { params });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get(`/marketplace/${id}`);
    return data;
  },

  create: async (itemData: any) => {
    const { data } = await api.post('/marketplace', itemData);
    return data;
  },

  update: async (id: string, itemData: any) => {
    const { data } = await api.put(`/marketplace/${id}`, itemData);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/marketplace/${id}`);
    return data;
  }
};
