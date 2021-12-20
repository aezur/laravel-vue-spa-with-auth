import router from '@/router';
import { getError } from '@/utils/helpers';
import AuthService from '@/services/AuthService';
import { AuthState } from 'vue';
import { ActionContext } from 'vuex';

export const namespaced = true;

const state = {
  user: null,
  loading: false,
  error: null,
  message: null,
};

const mutations = {
  SET_USER(state: AuthState, user: User): void {
    state.user = user;
  },
  SET_LOADING(state: AuthState, loading: boolean): void {
    state.loading = loading;
  },
  // eslint-disable-next-line
  SET_ERROR(state: AuthState, error: any): void {
    state.error = error;
  },
  SET_MESSAGE(state: AuthState, message: string): void {
    state.message = message;
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
        context.commit('SET_ERROR', getError(error));
      });
  },
  async getAuthUser(context: ActionContext<string, unknown>)
  : Promise<User|void> {
    context.commit('SET_LOADING', true);
    try {
      const response = await AuthService.getAuthUser();
      context.commit('SET_USER', response.data.data);
      context.commit('SET_LOADING', false);
      return response.data.data;
      // eslint-disable-next-line
    } catch (error: any) {
      if (error.response?.status !== 401) {
        context.commit('SET_ERROR', getError(error));
      }
      context.commit('SET_LOADING', false);
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
  // eslint-disable-next-line
  error: (state: AuthState): any => {
    return state.error;
  },
  message: (state: AuthState): string | undefined => {
    return state.message;
  },
  loading: (state: AuthState)
  : boolean | undefined => {
    return state.loading;
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