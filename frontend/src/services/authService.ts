import api from '../utils/api';

export const authService = {
  login: async (email: string, password: string) => {
    const { data } = await api.post('/students/login', { email, password });
    return data;
  },

  register: async (userData: any) => {
    const { data } = await api.post('/students/register', userData);
    return data;
  },

  getProfile: async () => {
    const { data } = await api.get('/students/profile');
    return data;
  }
};
