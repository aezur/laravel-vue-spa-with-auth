import { UIState } from 'vue';
import { ActionContext } from 'vuex';

export const namespaced = true;

const state = {
  menuIsOpen: false,
  loading: false,
  error: null,
  message: null,
};

const mutations = {
  SET_MENU_STATE(state: UIState, menuIsOpen: boolean): void {
    state.menuIsOpen = menuIsOpen;
  },
  SET_LOADING(state: UIState, loading: boolean): void {
    state.loading = loading;
  },
  // eslint-disable-next-line
  SET_ERROR(state: UIState, error: any): void {
    state.error = error;
  },
  SET_MESSAGE(state: UIState, message: string): void {
    state.message = message;
  },
};

const actions = {
  toggleMenu(context: ActionContext<string, unknown>) {
    context.commit('SET_MENU_STATE', !context.getters['menuIsOpen'])
  },
};

const getters = {
  // eslint-disable-next-line
  error: (state: UIState): any => {
    return state.error;
  },
  message: (state: UIState): string | undefined => {
    return state.message;
  },
  menuIsOpen: (state: UIState): boolean | undefined => {
    return state.menuIsOpen;
  },
  loading: (state: UIState)
  : boolean | undefined => {
    return state.loading;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};