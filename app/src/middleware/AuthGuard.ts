import { AuthState } from 'vue';
import {
  NavigationGuardNext,
  RouteLocationNormalized,
} from 'vue-router';
import { Store } from 'vuex';

export default function auth(
  to: RouteLocationNormalized,
  next: NavigationGuardNext,
  store: Store<AuthState>
): void {
  if (!store.getters['auth/authUser']) {
    store.dispatch('auth/getAuthUser').then(() => {
      if (!store.getters['auth/authUser']) {
        next({ name: 'login' })
      }
      else next();
    });
  } else {
    next();
  }
}