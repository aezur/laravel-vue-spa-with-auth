import apiService from '@/services/ApiService';


export default {
  // eslint-disable-next-line
  async uploadFile(payload: any): Promise<any> {
    return apiService.post(payload.endpoint, payload.file);
  },
};