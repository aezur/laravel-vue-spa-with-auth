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
  verified: string | null,
  isAdmin?: boolean,
}

interface Credentials {
  email: string,
  password: string,
}

interface CredentialsWithErrors extends Credentials {
  errors?: any;
}

interface EmailWithErrors {
  email: any;
  errors?: any;
}

interface RegistrationObject extends CredentialsWithErrors {
  name: string;
  password_confirmation: string;
}