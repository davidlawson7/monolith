import { createAction, props } from '@ngrx/store';

import { GenericAction } from '@utils';
import { CONFIGURATION_STORE_FEATURE_KEY } from '../configuration.constants';
import { Theme } from '../configuration.models';

export const bootstrapApp = createAction(
  `[${CONFIGURATION_STORE_FEATURE_KEY}] Bootstrap App`,
  props<GenericAction>()
);

export const changePage = createAction(
  `[${CONFIGURATION_STORE_FEATURE_KEY}] Change Page`,
  props<
    GenericAction<{
      pageName: string;
    }>
  >()
);

export const setDarkTheme = createAction(
  `[${CONFIGURATION_STORE_FEATURE_KEY}] Set Theme`,
  props<
    GenericAction<{
      theme: Theme;
    }>
  >()
);
