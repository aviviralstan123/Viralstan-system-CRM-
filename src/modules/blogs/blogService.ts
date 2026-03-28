import apiClient from '@/services/apiClient';
import { Blog } from '@/lib/mock-data';

export const blogService = {
  getAll: async () => {
    // In a real app: return apiClient.get<Blog[]>('/blogs');
    return null; // Using local store for now
  },
  
  getById: async (id: string) => {
    // return apiClient.get<Blog>(`/blogs/${id}`);
    return null;
  },
  
  create: async (blog: Omit<Blog, 'id'>) => {
    // return apiClient.post<Blog>('/blogs', blog);
    return null;
  },
  
  update: async (id: string, blog: Partial<Blog>) => {
    // return apiClient.put<Blog>(`/blogs/${id}`, blog);
    return null;
  },
  
  delete: async (id: string) => {
    // return apiClient.delete(`/blogs/${id}`);
    return null;
  }
};
