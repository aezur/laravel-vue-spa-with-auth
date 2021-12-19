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
    error?: ApiError,
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}