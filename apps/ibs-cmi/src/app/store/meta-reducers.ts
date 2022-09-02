import { COGNITO_STORE_FEATURE_KEY } from '@elmdex/core';
import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';

const APP_NAME = 'ibs-cmi';

function localStorageReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [COGNITO_STORE_FEATURE_KEY],
    rehydrate: true,
    storage: sessionStorage,
    storageKeySerializer: (key) => `store_${APP_NAME}_${key}`,
  })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [
  localStorageReducer,
  ...(!environment.production ? [storeFreeze] : []),
];
