export interface CmiEnvironment {
  production: boolean;
  development: boolean;
  cognito: {
    UserPoolId: string;
    ClientId: string;
  };
  // DONT COMMIT THESE
  login?: {
    code: string;
    mobile: string;
    password: string;
  };
}
