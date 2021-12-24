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
  }

  interface UIState {
    menuIsOpen?: boolean,
    loading?: boolean,
    error?: any,
    message?: string,
  }


  interface ComponentCustomProperties {
    $store: Store<State>
  }
}