import { AuthState } from 'vue';
import {
  NavigationGuardNext,
  RouteLocationNormalized,
} from 'vue-router';
import { Store } from 'vuex';

export default function AdminGuard(
  to: RouteLocationNormalized,
  next: NavigationGuardNext,
  store: Store<AuthState>
) {
  if (store.getters['auth/isAdmin']) next();
  else next({ name: 'not-found' });
}