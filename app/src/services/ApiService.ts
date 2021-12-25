import axios from 'axios';
import store from '@/store';

const baseURL = process.env.VUE_APP_API_URL;

const apiService = axios.create({
  baseURL: `${baseURL}/api/`,
  withCredentials: true, // required to handle the CSRF token
});

/*
 * Add a response interceptor
 */
apiService.interceptors.response.use(
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

export default apiService;