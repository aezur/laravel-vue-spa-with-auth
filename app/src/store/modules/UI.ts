import { ModalParams, UIState } from 'vue';
import { ActionContext } from 'vuex';

export const namespaced = true;

const state = {
  menuIsOpen: false,
  modalIsOpen: false,
  modalTitle: null,
  modalText: null,
  loading: false,
  error: null,
  message: null,
};

const mutations = {
  SET_MENU_STATE(state: UIState, menuIsOpen: boolean): void {
    state.menuIsOpen = menuIsOpen;
  },
  SET_MODAL_STATE(state: UIState, modalIsOpen: boolean): void {
    state.modalIsOpen = modalIsOpen;
  },
  SET_MODAL_TITLE(state: UIState, modalTitle: string): void {
    state.modalTitle = modalTitle;
  },
  SET_MODAL_TEXT(state: UIState, modalText: string): void {
    state.modalText = modalText;
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
    context.commit('SET_MENU_STATE', !context.getters['menuIsOpen']);
  },
  openMenu(context: ActionContext<string, unknown>) {
    context.commit('SET_MENU_STATE', true);
  },
  closeMenu(context: ActionContext<string, unknown>) {
    context.commit('SET_MENU_STATE', false);
  },
  openModal(
    context: ActionContext<string, unknown>,
    value: ModalParams
  ) {
    context.commit('SET_MODAL_STATE', true);
    context.commit('SET_MODAL_TITLE', value.title);
    context.commit('SET_MODAL_TEXT', value.text);
  },
  closeModal(context: ActionContext<string, unknown>) {
    context.commit('SET_MODAL_STATE', false);
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
  modalIsOpen: (state: UIState): boolean | undefined => {
    return state.modalIsOpen;
  },
  modalTitle: (state: UIState): string | undefined => {
    return state.modalTitle;
  },
  modalText: (state: UIState): string | undefined => {
    return state.modalText;
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