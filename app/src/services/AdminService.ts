import axios from 'axios';
import store from '@/store';

const baseURL = process.env.VUE_APP_API_URL;

export const adminClient = axios.create({
  baseURL,
  withCredentials: true, // required to handle the CSRF token
});

/*
 * Add a response interceptor
 */
adminClient.interceptors.response.use(
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
  getUsers(): Promise<{ data: { data: User[] }}> {
    return adminClient.get('/api/users');
  },
};