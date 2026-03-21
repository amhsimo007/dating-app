import api from './api';

export interface MessageData {
  content: string;
  type?: 'text' | 'image' | 'gif' | 'voice';
  mediaUrl?: string;
}

export interface MessageFilters {
  page?: number;
  limit?: number;
}

export interface ReportData {
  reason: 'inappropriate' | 'spam' | 'harassment' | 'other';
  description?: string;
}

export const chatService = {
  getMessages: async (matchId: string, filters: MessageFilters = {}) => {
    const response = await api.get(`/chat/${matchId}`, { params: filters });
    return response.data;
  },

  sendMessage: async (matchId: string, data: MessageData) => {
    const response = await api.post(`/chat/${matchId}`, data);
    return response.data;
  },

  editMessage: async (messageId: string, content: string) => {
    const response = await api.put(`/chat/${messageId}`, { content });
    return response.data;
  },

  deleteMessage: async (messageId: string) => {
    const response = await api.delete(`/chat/${messageId}`);
    return response.data;
  },

  reportMessage: async (messageId: string, data: ReportData) => {
    const response = await api.post(`/chat/${messageId}/report`, data);
    return response.data;
  }
};
