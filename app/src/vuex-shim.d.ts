import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
    auth?: AuthState,
    admin?: AdminState,
    ui?: UIState,
  }

  interface AuthState {
    user?: User,
  }

  interface AdminState {
    users?: User[],
    meta?: Meta,
    links?: Links,
  }

  interface UIState {
    menuIsOpen?: boolean,
    loading?: boolean,
    error?: any,
    message?: string,
  }

  interface Links {
    first?: string,
    last?: string,
    prev?: string,
    next?: string,
  }

  interface Meta {
    current_page: number,
    from: number,
    last_page: number,
    path: string,
    per_page: number,
    to: number,
    total: number,
  }


  interface ComponentCustomProperties {
    $store: Store<State>
  }
}