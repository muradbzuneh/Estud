import api from '../utils/api';

export const announcementService = {
  // Get all announcements with filters (FR-6)
  getAll: async (params?: { 
    search?: string; 
    category?: string; 
    page?: number;
    limit?: number;
  }) => {
    const { data } = await api.get('/announcment', { params });
    return data.announcements || data;
  },

  // Get single announcement and mark as read (FR-6)
  getById: async (id: string) => {
    const { data } = await api.get(`/announcment/${id}`);
    return data;
  },

  // Admin: Create announcement (FR-4, FR-5)
  create: async (announcementData: {
    title: string;
    content: string;
    targetGroup: 'UNIVERSITY' | 'DEPARTMENT' | 'CLASS';
    department?: string;
    expiresAt: string;
    isImportant?: boolean;
  }) => {
    const { data } = await api.post('/announcment', announcementData);
    return data;
  },

  // Admin: Update announcement
  update: async (id: string, updates: any) => {
    const { data } = await api.put(`/announcment/${id}`, updates);
    return data;
  },

  // Admin: Delete announcement
  delete: async (id: string) => {
    const { data } = await api.delete(`/announcment/${id}`);
    return data;
  }
};
