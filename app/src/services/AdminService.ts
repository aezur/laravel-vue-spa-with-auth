import apiService from '@/services/ApiService';

export default {
  getUsers(page = 0): Promise<{ data: { data: User[] }}> {
    return apiService.get(`/users?page=${page}`);
  },
  paginateUsers(link: string): Promise<{ data: { data: User[] }}> {
    return apiService.get(link);
  },
};