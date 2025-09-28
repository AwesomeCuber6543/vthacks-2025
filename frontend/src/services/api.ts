import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User API
export const userAPI = {
  createUser: async (userData: any) => {
    const response = await api.post('/db/users', userData);
    return response.data;
  },

  getAllUsers: async () => {
    const response = await api.get('/db/users');
    return response.data;
  },

  getUser: async (userId: number) => {
    const response = await api.get(`/db/users/${userId}`);
    return response.data;
  },

  updateUser: async (userId: number, userData: any) => {
    const response = await api.put(`/db/users/${userId}`, userData);
    return response.data;
  },

  updateFinancial: async (userId: number, financialData: any) => {
    const response = await api.post(`/db/users/${userId}/financial`, financialData);
    return response.data;
  },

  updateTuition: async (userId: number, tuitionData: any) => {
    const response = await api.post(`/db/users/${userId}/tuition`, tuitionData);
    return response.data;
  },

  getFinancial: async (userId: number) => {
    const response = await api.get(`/db/users/${userId}/financial`);
    return response.data;
  },

  getTuition: async (userId: number) => {
    const response = await api.get(`/db/users/${userId}/tuition`);
    return response.data;
  },
};

// Chat API
export const chatAPI = {
  addChat: async (chatData: any) => {
    const response = await api.post('/db/chat', chatData);
    return response.data;
  },

  getUserChats: async (userId: number) => {
    const response = await api.get(`/db/users/${userId}/chats`);
    return response.data;
  },
};

// Document API
export const documentAPI = {
  uploadDocument: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  searchDocuments: async (query: string, k: number = 3) => {
    const response = await api.post('/documents/search', { query, k });
    return response.data;
  },

  searchAndAnalyze: async (query: string, k: number = 3) => {
    const response = await api.post('/documents/search-and-analyze', { query, k });
    return response.data;
  },

  getIndexedDocuments: async () => {
    const response = await api.get('/documents/indexed');
    return response.data;
  },
};

// Perplexity API
export const perplexityAPI = {
  query: async (query: string) => {
    const response = await api.post('/query-perplexity', { query });
    return response.data;
  },
};

// ChromaDB API
export const chromaAPI = {
  indexText: async (text: string, metadata: any = {}) => {
    const response = await api.post('/index-text', { text, metadata });
    return response.data;
  },

  searchText: async (query: string, nResults: number = 5) => {
    const response = await api.get(`/search-text?query=${encodeURIComponent(query)}&n_results=${nResults}`);
    return response.data;
  },

  deleteIndex: async () => {
    const response = await api.delete('/delete-index');
    return response.data;
  },
};

export default api;
