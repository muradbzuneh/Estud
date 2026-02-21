import api from '../utils/api';

export const marketplaceService = {
  getAll: async () => {
    const { data } = await api.get('/marketplace/listings');
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get(`/marketplace/listings/${id}`);
    return data;
  },

  create: async (itemData: any) => {
    const { data } = await api.post('/marketplace/listings', itemData);
    return data;
  },

  toggleFavorite: async (itemId: string) => {
    const { data } = await api.post(`/marketplace/favorites/${itemId}`);
    return data;
  }
};
