import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { CONFIGURATION_STORE_FEATURE_KEY } from './configuration.constants';
import { configurationReducer } from './store/configuration.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      CONFIGURATION_STORE_FEATURE_KEY,
      configurationReducer
    ),
  ],
})
export class ConfigurationModule {}
