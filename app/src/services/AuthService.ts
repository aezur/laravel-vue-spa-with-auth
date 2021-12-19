import axios from 'axios';
import store from '@/store';

const baseURL = process.env.VUE_APP_API_URL;

export const authClient = axios.create({
  baseURL,
  withCredentials: true, // required to handle the CSRF token
});

/*
 * Add a response interceptor
 */
authClient.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (
      error.response &&
      [401, 419].includes(error.response.status) &&
      store.getters['auth/authUser'] &&
      !store.getters['auth/guest']
    ) {
      store.dispatch('auth/logout');
    }
    return Promise.reject(error);
  }
);

export default {
  async login(payload: Credentials) {
    await authClient.get('/sanctum/csrf-cookie');
    return authClient.post('/login', payload);
  },
  logout() {
    return authClient.post('/logout');
  },
  async forgotPassword(payload: any) {
    await authClient.get('/sanctum/csrf-cookie');
    return authClient.post('/forgot-password', payload);
  },
  getAuthUser() {
    return authClient.get('/api/users/auth');
  },
  async resetPassword(payload: any) {
    await authClient.get('/sanctum/csrf-cookie');
    return authClient.post('/reset-password', payload);
  },
  updatePassword(payload: any) {
    return authClient.put('/user/password', payload);
  },
  async registerUser(payload: any) {
    await authClient.get('/sanctum/csrf-cookie');
    return authClient.post('/register', payload);
  },
  sendVerification(payload: any) {
    return authClient.post('/email/verification-notification', payload);
  },
  updateUser(payload: any) {
    return authClient.put('/user/profile-information', payload);
  },
};