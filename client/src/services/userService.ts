import api from './api';

export interface UserFilters {
  page?: number;
  limit?: number;
  minAge?: number;
  maxAge?: number;
  maxDistance?: number;
}

export interface InteractionData {
  action: 'like' | 'pass';
}

export interface ReportData {
  reason: 'inappropriate' | 'spam' | 'fake' | 'harassment' | 'other';
  description?: string;
}

export const userService = {
  getPotentialMatches: async (filters: UserFilters = {}) => {
    const response = await api.get('/users/discover', { params: filters });
    return response.data;
  },

  interactWithUser: async (userId: string, data: InteractionData) => {
    const response = await api.post(`/users/interact/${userId}`, data);
    return response.data;
  },

  getMatches: async () => {
    const response = await api.get('/users/matches');
    return response.data;
  },

  reportUser: async (userId: string, data: ReportData) => {
    const response = await api.post(`/users/report/${userId}`, data);
    return response.data;
  }
};
