import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import icons from '@/utils/icons';

createApp(App)
  .use(store)
  .use(router)
  .component('fa-icon', icons)
  .mount('#app');
