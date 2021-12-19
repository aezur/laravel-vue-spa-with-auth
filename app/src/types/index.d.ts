/* eslint-disable */
interface ApiError {
  name?: string,
  message?: string,
  response?: {
    data?: {
      errors?: {},
    },
    status?: {},
    headers?: {},
  },
  config?: {
    url?: string,
  },
};

interface User {
  name: string,
  email: string,
  verified?: string,
  isAdmin?: boolean,
};

interface Credentials {
  email: string,
  password: string,
};

interface CredentialsWithErrors extends Credentials {
  errors?: any;
};

interface EmailWithErrors {
  email: string;
  errors?: any;
};

interface RegistrationObject extends CredentialsWithErrors {
  name: string;
  password_confirmation: string;
};

interface Context {
  to: RouteLocationNormalized;
  from: RouteLocationNormalized;
  next: NavigationGuardNext;
  store: Store<AuthState>;
};
