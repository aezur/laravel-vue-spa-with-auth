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
  if (!store.getters['auth/guest']) {
    store.dispatch('auth/getAuthUser').then(() => {
      if (store.getters['auth/authUser']) {
        next({ name: 'home' });
      } else {
        store.dispatch('auth/setGuest', { value: 'isGuest' });
        next();
      }
    });
  } else next();
}