import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { AppComponent } from './app.component';

import {
  awsLoginSuccess,
  bootstrapApp,
  CognitoEffects,
  CognitoModule,
  CognitoService,
  ConfigurationModule,
  CoreModule,
  selectCognitoSessionData,
} from '@elmdex/core';
import { UiModule } from '@ui';
import { FeaturesModule } from '@features';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule, USER_PROVIDED_EFFECTS } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ENVIRONMENT } from '@elmdex/core';
import { environment } from '../environments/environment';
import { metaReducers } from './store/meta-reducers';
import { AppRoutingModule } from './app-routing.module';
import { firstValueFrom } from 'rxjs';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

export const bootstrap =
  (store: Store, cognitoService: CognitoService) => async () => {
    store.dispatch(
      bootstrapApp({
        metadata: {
          correlationId: Date.now().toString(),
        },
      })
    );

    const cognitoSessionData = await firstValueFrom(
      store.select(selectCognitoSessionData)
    );

    if (cognitoSessionData) {
      const cachedSession = new CognitoUserSession(cognitoSessionData);
      if (!cachedSession.isValid()) {
        const newStoreData = await firstValueFrom(
          cognitoService.refresh(cognitoSessionData)
        );
        store.dispatch(
          awsLoginSuccess({
            metadata: {
              correlationId: Date.now().toString(),
            },
            payload: JSON.parse(JSON.stringify(newStoreData)),
          })
        );
      }
    }
  };

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    UiModule,
    FeaturesModule,
    ConfigurationModule,
    CognitoModule,
    StoreModule.forRoot(
      {
        router: routerReducer,
      },
      {
        metaReducers,
        runtimeChecks: {
          strictActionImmutability: true,
          strictActionSerializability: true,
          strictActionTypeUniqueness: true,
          strictActionWithinNgZone: true,
          strictStateImmutability: true,
          strictStateSerializability: true,
        },
      }
    ),
    EffectsModule.forRoot(),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    {
      provide: ENVIRONMENT,
      useValue: environment,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: bootstrap,
      multi: true,
      deps: [Store, CognitoService],
    },
    {
      provide: USER_PROVIDED_EFFECTS,
      multi: true,
      useValue: [CognitoEffects],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
