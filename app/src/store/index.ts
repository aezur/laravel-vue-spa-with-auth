import { createStore, createLogger } from 'vuex';
import admin from './modules/Admin';
import auth from './modules/Auth';
import ui from './modules/UI';

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    admin,
    auth,
    ui,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
