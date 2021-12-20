/* eslint-disable */

interface User {
  name: string,
  email: string,
  verified?: string,
  isAdmin?: boolean,
};

interface Context {
  to: RouteLocationNormalized;
  from: RouteLocationNormalized;
  next: NavigationGuardNext;
  store: Store<AuthState>;
};

interface Middleware {
  (
    to: RouteLocationNormalized,
    next: NavigationGuardNext,
    store: Store<AuthState>
  ): void;
}
