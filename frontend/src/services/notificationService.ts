import api from '../utils/api';

export interface Notification {
  _id: string;
  user: string;
  title: string;
  message: string;
  type: 'announcement' | 'reservation' | 'marketplace';
  referenceId?: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export const notificationService = {
  // Get user's notifications with pagination
  getMyNotifications: async (page: number = 1, limit: number = 20) => {
    const { data } = await api.get('/notifications', { 
      params: { page, limit } 
    });
    return data;
  },

  // Mark single notification as read
  markAsRead: async (id: string) => {
    const { data } = await api.patch(`/notifications/${id}/read`);
    return data;
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    const { data } = await api.patch('/notifications/read-all');
    return data;
  },

  // Delete notification
  deleteNotification: async (id: string) => {
    const { data } = await api.delete(`/notifications/${id}`);
    return data;
  },

  // Get unread count (from the main response)
  getUnreadCount: async (): Promise<number> => {
    const { data } = await api.get('/notifications', { 
      params: { page: 1, limit: 1 } 
    });
    return data.unreadCount || 0;
  }
};
