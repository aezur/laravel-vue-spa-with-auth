import { getError } from '@/utils/helpers';
import AdminService from '@/services/AdminService';
import { AdminState, Links, Meta } from 'vue';
import { Commit } from 'vuex';
import store from '..';

export const namespaced = true;

// eslint-disable-next-line
function setPaginatedUsers(commit: Commit, response: any) {
  commit("SET_USERS", response.data.data);
  commit("SET_META", response.data.meta);
  commit("SET_LINKS", response.data.links);
  store.commit("ui/SET_LOADING", false);
}

const state = {
  users: null,
  meta: null,
  links: null,
};

const mutations = {
  SET_USERS(state: AdminState, users: User[]): void {
    state.users = users;
  },
  SET_META(state: AdminState, meta: Meta): void {
    state.meta = meta;
  },
  SET_LINKS(state: AdminState, links: Links): void {
    state.links = links;
  },
};

const actions = {
  // es-lint-disable-next-line
  async getUsers({ commit }: { commit: Commit}, page: number)
  : Promise<User[] | void> {
    store.commit('ui/SET_LOADING', true);
    try {
      await AdminService.getUsers(page)
        .then((response) => {
          setPaginatedUsers(commit, response);
        });
      // eslint-disable-next-line
    } catch (error: any) {
      store.commit('ui/SET_ERROR', getError(error));
      store.commit('ui/SET_LOADING', false);
      commit('SET_USERS', null);
    }
  },
  async paginateUsers({ commit }: { commit: Commit}, link: string)
  : Promise<User[] | void> {
    store.commit("ui/SET_LOADING", true);
    await AdminService.paginateUsers(link)
      .then((response) => {
        setPaginatedUsers(commit, response);
      })
      .catch((error) => {
        store.commit("ui/SET_LOADING", false);
        store.commit("ui/SET_ERROR", getError(error));
      });
  },
};

const getters = {
  users: (state: AdminState): User[] | void => {
    return state.users;
  },
  meta: (state: AdminState): Meta | void => {
    return state.meta;
  },
  links: (state: AdminState): Links | void => {
    return state.links;
  },
  currentPage: (state: AdminState): number | void => {
    return state.meta?.current_page;
  },
  totalPages: (state: AdminState): number | void => {
    return state.meta?.total;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};