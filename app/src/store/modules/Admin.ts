import { getError } from '@/utils/helpers';
import AdminService from '@/services/AdminService';
import { AdminState } from 'vue';
import { ActionContext } from 'vuex';
import store from '..';

export const namespaced = true;

const state = {
  users: null,
};

const mutations = {
  SET_USERS(state: AdminState, users: User[]): void {
    state.users = users;
  },
};

const actions = {
  // es-lint-disable-next-line
  async getUsers(context: ActionContext<string, unknown>)
  : Promise<User[] | void> {
    store.commit('ui/SET_LOADING', true);
    try {
      const response = await AdminService.getUsers();
      context.commit('SET_USERS', response.data.data);
      store.commit('ui/SET_LOADING', false);
      return response.data.data;
      // eslint-disable-next-line
    } catch (error: any) {
      store.commit('ui/SET_ERROR', getError(error));
      store.commit('ui/SET_LOADING', false);
      context.commit('SET_USERS', null);
    }
  },
};

const getters = {
  users: (state: AdminState): User[] | void => {
    return state.users;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};