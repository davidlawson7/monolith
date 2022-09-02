import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { CognitoService } from '../cognito.service';
import { of } from 'rxjs';
import {
  awsLogin,
  awsLoginFailure,
  awsLoginMissingPayload,
  awsLoginSuccess,
} from './cognito.actions';

@Injectable()
export class CognitoEffects {
  constructor(private actions$: Actions, private cognito: CognitoService) {}

  awsLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(awsLogin),
      exhaustMap((action) => {
        if (
          !action.payload ||
          !action.payload.password ||
          !action.payload.phoneNumber
        ) {
          return of(
            awsLoginMissingPayload({
              metadata: {
                correlationId: Date.now().toString(),
              },
            })
          );
        }

        return this.cognito
          .signIn(action.payload?.phoneNumber, action.payload?.password)
          .pipe(
            map(
              (res) => {
                console.log(res);
                return awsLoginSuccess({
                  metadata: {
                    correlationId: Date.now().toString(),
                  },
                  payload: JSON.parse(JSON.stringify(res)),
                });
              },
              catchError(() =>
                of(
                  awsLoginFailure({
                    metadata: {
                      correlationId: Date.now().toString(),
                    },
                  })
                )
              )
            )
          );
      })
    );
  });
}
