import { createReducer, on } from '@ngrx/store';
import { CognitoState } from '../cognito.models';
import { awsLogin, awsLoginSuccess, awsLoginFailure } from './cognito.actions';

export const cognitoInitialState: CognitoState = {
  authenticated: false,
};

export const cognitoReducer = createReducer(
  cognitoInitialState,

  on(awsLogin, (state, action): CognitoState => {
    return {
      ...state,
    };
  }),

  on(awsLoginSuccess, (state, action): CognitoState => {
    return {
      ...state,
      authenticated: action.payload ? true : false,
      authenticationResult: action.payload,
    };
  }),

  on(awsLoginFailure, (state, action): CognitoState => {
    return {
      ...state,
    };
  })
);
