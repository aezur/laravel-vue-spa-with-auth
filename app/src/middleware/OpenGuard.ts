import { AuthState } from 'vue';
import {
  NavigationGuardNext,
  RouteLocationNormalized,
} from 'vue-router';
import { Store } from 'vuex';

export default function OpenGuard(
  to: RouteLocationNormalized,
  next: NavigationGuardNext,
  store: Store<AuthState>
): void {
  if (!store.getters['auth/authUser'] || store.getters['auth/guest']) {
    store.dispatch('auth/getAuthUser').then(() => {
      if (!store.getters['auth/authUser']) {
        next();
      } else next({ name: 'home' });
    });
  } else next({ name: 'home' });
}