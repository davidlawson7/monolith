import {
  CognitoAccessToken,
  CognitoIdToken,
  CognitoRefreshToken,
} from 'amazon-cognito-identity-js';

export interface CognitoState {
  authenticated: boolean;
  authenticationResult?: AuthenticationResult;
}

export interface LoginCredentials {
  phoneNumber: string;
  password: string;
}

export interface AuthenticationResult {
  accessToken: CognitoAccessToken;
  idToken: CognitoIdToken;
  refreshToken: CognitoRefreshToken;
  clockDrift: number;
}
