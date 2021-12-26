import apiService from '@/services/ApiService';


export default {
  // eslint-disable-next-line
  async uploadFile(payload: any) {
    await apiService.post(payload.endpoint, payload.file);
  },
};