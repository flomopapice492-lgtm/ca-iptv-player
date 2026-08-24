import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const channelAPI = {
  getAll: () => api.get('/channels'),
  getById: (id: string) => api.get(`/channels/${id}`),
  search: (query: string) => api.get(`/channels/search/query?q=${query}`),
  getByCountry: (code: string) => api.get(`/channels/country/${code}`),
  getByCategory: (category: string) => api.get(`/channels/category/${category}`),
};

export const epgAPI = {
  getAll: (limit?: number) => api.get('/epg', { params: { limit } }),
  getByChannel: (channelId: string, limit?: number) =>
    api.get(`/epg/channel/${channelId}`, { params: { limit } }),
  getByYear: (year: number) => api.get(`/epg/year/${year}`),
  getByGenre: (genre: string) => api.get(`/epg/genre/${genre}`),
  searchPrograms: (query: string) => api.get(`/epg/search/programs?q=${query}`),
  getUpcoming: (limit?: number) => api.get('/epg/upcoming', { params: { limit } }),
};

export const searchAPI = {
  global: (query: string) => api.get('/search?q=' + query),
  advanced: (data: any) => api.post('/search/advanced', data),
};

export default api;
