import router from '@/router';
import { getError } from '@/utils/helpers';
import AuthService from '@/services/AuthService';
import { AuthState } from 'vue';
import { Dispatch, Commit, ActionContext } from 'vuex';

export const namespaced = true;

const state = {
  user: null,
  loading: false,
  error: null,
};

const mutations = {
  SET_USER(state: AuthState, user: User) {
    state.user = user;
  },
  SET_LOADING(state: AuthState, loading: boolean) {
    state.loading = loading;
  },
  SET_ERROR(state: AuthState, error: any) {
    state.error = error;
  },
};

const actions = {
  logout(context: ActionContext<any, unknown>) {
    return AuthService.logout()
      .then(() => {
        context.commit('SET_USER', null);
        context.dispatch('setGuest', { value: 'isGuest' });
        if (router.currentRoute.value.name !== 'login')
          router.push({ path: '/login' });
      })
      .catch((error) => {
        context.commit('SET_ERROR', getError(error));
      });
  },
  async getAuthUser(context: ActionContext<any, unknown>) {
    context.commit('SET_LOADING', true);
    try {
      const response = await AuthService.getAuthUser();
      context.commit('SET_USER', response.data.data);
      context.commit('SET_LOADING', false);
      return response.data.data;
    } catch (error) {
      context.commit('SET_LOADING', false);
      context.commit('SET_USER', null);
      context.commit('SET_ERROR', getError(error));
    }
  },
  setGuest(
    context: ActionContext<any, unknown>,
    { value }: { value: any }
  ) {
    window.localStorage.setItem('guest', value);
  },
};

const getters = {
  authUser: (state: AuthState) => {
    return state.user;
  },
  isAdmin: (state: AuthState) => {
    return state.user ? state.user.isAdmin : false;
  },
  error: (state: AuthState) => {
    return state.error;
  },
  loading: (state: AuthState) => {
    return state.loading;
  },
  loggedIn: (state: AuthState) => {
    return !!state.user;
  },
  guest: () => {
    const storageItem = window.localStorage.getItem('guest');
    if (!storageItem) return false;
    if (storageItem === 'isGuest') return true;
    if (storageItem === 'isNotGuest') return false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};