import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CognitoAccessToken,
  CognitoIdToken,
  CognitoRefreshToken,
  ICognitoUserData,
  ICognitoUserSessionData,
} from 'amazon-cognito-identity-js';
import { COGNITO_STORE_FEATURE_KEY } from '../cognito.constants';
import { CognitoState } from '../cognito.models';

export const selectCognitoState = createFeatureSelector<CognitoState>(
  COGNITO_STORE_FEATURE_KEY
);

export const isAuthenticated = createSelector(
  selectCognitoState,
  (state): boolean => state.authenticated
);

export const selectAccessToken = createSelector(
  selectCognitoState,
  (state): CognitoAccessToken | undefined =>
    state.authenticationResult?.accessToken
);

export const selectCognitoSessionData = createSelector(
  selectCognitoState,
  (state): ICognitoUserSessionData | undefined => {
    if (!state.authenticationResult) {
      return undefined;
    }

    const sessionData: ICognitoUserSessionData = {
      IdToken: new CognitoIdToken({
        IdToken: (state.authenticationResult.idToken as any).jwtToken,
      }),
      AccessToken: new CognitoAccessToken({
        AccessToken: (state.authenticationResult.accessToken as any).jwtToken,
      }),
      RefreshToken: new CognitoRefreshToken({
        RefreshToken: (state.authenticationResult.refreshToken as any).token,
      }),
    };

    return sessionData;
  }
);

export const selectCognitoUserData = createSelector(
  selectCognitoState,
  (state): any => {
    if (!state.authenticationResult) {
      return undefined;
    }

    const data = {
      phoneNumber: state.authenticationResult.idToken.payload['phone_number'],
      email: state.authenticationResult.idToken.payload['email'],
    };
    return data;
  }
);
