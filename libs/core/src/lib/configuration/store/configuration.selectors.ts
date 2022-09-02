import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CONFIGURATION_STORE_FEATURE_KEY } from '../configuration.constants';
import {
  AugmentedPageData,
  ConfigurationState,
  Theme,
} from '../configuration.models';

export const selectConfigurationState =
  createFeatureSelector<ConfigurationState>(CONFIGURATION_STORE_FEATURE_KEY);

export const selectMainMenu = createSelector(
  selectConfigurationState,
  (state): AugmentedPageData[] =>
    state.pages.map((page) => ({
      ...page,
      isSelected: state.selectedPage === page.name ? true : false,
    }))
);

export const selectTheme = createSelector(
  selectConfigurationState,
  (state): Theme => state.theme
);
