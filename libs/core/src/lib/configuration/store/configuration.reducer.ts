import { Icons } from '@utils';
import { createReducer, on } from '@ngrx/store';
import { ConfigurationState, Theme } from '../configuration.models';
import {
  bootstrapApp,
  changePage,
  setDarkTheme,
} from './configuration.actions';

export const configurationInitialState: ConfigurationState = {
  pages: [],
  theme: Theme.dark,
};

export const configurationReducer = createReducer(
  configurationInitialState,

  on(bootstrapApp, (state, action): ConfigurationState => {
    return {
      ...state,
      pages: [
        {
          name: 'pages',
          icon: Icons.Page,
        },
        {
          name: 'search',
          icon: Icons.Data,
        },
      ],
      selectedPage: 'pages',
    };
  }),

  on(changePage, (state, action): ConfigurationState => {
    return {
      ...state,
      selectedPage: action.payload?.pageName,
    };
  }),

  on(setDarkTheme, (state, action): ConfigurationState => {
    return {
      ...state,
      theme: action.payload?.theme || Theme.light,
    };
  })
);
