import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { COGNITO_STORE_FEATURE_KEY } from './cognito.constants';
import { cognitoReducer } from './store/cognito.reducer';
import { CognitoService } from './cognito.service';
import { EffectsModule } from '@ngrx/effects';
import { CognitoEffects } from './store/cognito.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(COGNITO_STORE_FEATURE_KEY, cognitoReducer),
    EffectsModule.forFeature([CognitoEffects]),
  ],
  providers: [CognitoService],
})
export class CognitoModule {}
