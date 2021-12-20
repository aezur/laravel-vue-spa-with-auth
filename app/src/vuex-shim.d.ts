import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
    auth?: AuthState,
  }

  interface AuthState {
    user?: User,
    loading?: boolean,
    error?: any,
    message?: string,
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}