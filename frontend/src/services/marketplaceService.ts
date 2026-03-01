import api from '../utils/api';

export const marketplaceService = {
  // Get all items with filters (FR-16)
  getAll: async (params?: { 
    search?: string; 
    category?: string; 
    department?: string;
    page?: number;
    limit?: number;
  }) => {
    const { data } = await api.get('/marketplace', { params });
    return data;
  },

  // Get single item details
  getById: async (id: string) => {
    const { data } = await api.get(`/marketplace/${id}`);
    return data;
  },

  // Get my listings
  getMyListings: async () => {
    const { data } = await api.get('/marketplace/my');
    return data;
  },

  // Create listing (FR-15)
  create: async (itemData: {
    title: string;
    description: string;
    price: number;
    category?: string;
    images?: string[];
  }) => {
    const { data } = await api.post('/marketplace', itemData);
    return data;
  },

  // Update listing
  update: async (id: string, itemData: any) => {
    const { data } = await api.put(`/marketplace/${id}`, itemData);
    return data;
  },

  // Mark as sold (FR-17)
  markAsSold: async (id: string) => {
    const { data } = await api.patch(`/marketplace/${id}/sold`);
    return data;
  },

  // Delete listing (FR-18)
  delete: async (id: string) => {
    const { data } = await api.delete(`/marketplace/${id}`);
    return data;
  }
};
