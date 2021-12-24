import router from '@/router';
import { getError } from '@/utils/helpers';
import AuthService from '@/services/AuthService';
import { AuthState } from 'vue';
import { ActionContext } from 'vuex';
import store from '..';

export const namespaced = true;

const state = {
  user: null,
};

const mutations = {
  SET_USER(state: AuthState, user: User): void {
    state.user = user;
  },
};

const actions = {
  // es-lint-disable-next-line
  async logout(context: ActionContext<string, unknown>)
  : Promise<void> {
    return AuthService.logout()
      .then(() => {
        context.commit('SET_USER', null);
        context.dispatch('setGuest', { value: 'isGuest' });
        if (router.currentRoute.value.name !== 'login')
          router.push({ path: '/login' });
      })
      .catch((error) => {
        store.commit('ui/SET_ERROR', getError(error));
      });
  },
  async getAuthUser(context: ActionContext<string, unknown>)
  : Promise<User|void> {
    store.commit('ui/SET_LOADING', true);
    try {
      const response = await AuthService.getAuthUser();
      context.commit('SET_USER', response.data.data);
      store.commit('ui/SET_LOADING', false);
      return response.data.data;
      // eslint-disable-next-line
    } catch (error: any) {
      if (error.response?.status !== 401) {
        store.commit('ui/SET_ERROR', getError(error));
      }
      store.commit('ui/SET_LOADING', false);
      context.commit('SET_USER', null);
      context.dispatch('setGuest', { value: 'isGuest' });
    }
  },
  setGuest(
    context: ActionContext<string, unknown>,
    { value }: { value: string }
  ): void {
    window.localStorage.setItem('guest', value);
  },
};

const getters = {
  authUser: (state: AuthState): User | undefined => {
    return state.user;
  },
  isAdmin: (state: AuthState): boolean => {
    return state.user ? !!state.user.isAdmin : false;
  },
  loggedIn: (state: AuthState): boolean => {
    return !!state.user;
  },
  guest: (): boolean => {
    const storageItem = window.localStorage.getItem('guest');
    if (!storageItem) return false;
    if (storageItem === 'isGuest') return true;
    else if (storageItem === 'isNotGuest') return false;
    else return false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};