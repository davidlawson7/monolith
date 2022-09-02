import { createAction, props } from '@ngrx/store';

import { GenericAction } from '@utils';
import { COGNITO_STORE_FEATURE_KEY } from '../cognito.constants';
import { AuthenticationResult, LoginCredentials } from '../cognito.models';

export const awsLogin = createAction(
  `[${COGNITO_STORE_FEATURE_KEY}] AWS Login`,
  props<GenericAction<LoginCredentials>>()
);

export const awsLoginSuccess = createAction(
  `[${COGNITO_STORE_FEATURE_KEY}] AWS Login Success`,
  props<GenericAction<AuthenticationResult>>()
);

export const awsLoginFailure = createAction(
  `[${COGNITO_STORE_FEATURE_KEY}] AWS Login Failure`,
  props<GenericAction>()
);

export const awsLoginMissingPayload = createAction(
  `[${COGNITO_STORE_FEATURE_KEY}] AWS Login Missing Payload`,
  props<GenericAction>()
);
