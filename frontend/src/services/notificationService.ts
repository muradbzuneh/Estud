import api from '../utils/api';

export interface Notification {
  _id: string;
  user: string;
  title: string;
  message: string;
  type: 'announcement' | 'marketplace';
  referenceId: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export const notificationService = {
  getMyNotifications: async (): Promise<Notification[]> => {
    const { data } = await api.get('/notify');
    return data;
  },

  markAsRead: async (id: string) => {
    const { data } = await api.patch(`/notify/${id}/read`);
    return data;
  },

  getUnreadCount: async (): Promise<number> => {
    const { data } = await api.get('/notify/unread/count');
    return data.count;
  }
};
