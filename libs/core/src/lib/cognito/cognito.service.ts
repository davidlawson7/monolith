import { Inject, Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import {
  AuthenticationDetails,
  CognitoRefreshToken,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
  ICognitoUserSessionData,
} from 'amazon-cognito-identity-js';
import { CmiEnvironment } from '@utils';
import { ENVIRONMENT } from '../constants/injection-tokens';

export interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
  code?: string;
  name?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  private userPool: CognitoUserPool;

  constructor(@Inject(ENVIRONMENT) private environment: CmiEnvironment) {
    this.userPool = new CognitoUserPool(this.environment.cognito);
  }

  signIn(phone: string, password: string): Observable<CognitoUserSession> {
    const authenticationData = {
      Username: phone,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = {
      Username: phone,
      Pool: this.userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    return new Observable((observer: any) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result: CognitoUserSession) {
          observer.next(result);
          observer.complete();
        },
        onFailure: function (err) {
          console.log(err);
          observer.error(err);
        },
      });
    });
  }

  refresh(
    sessionData: ICognitoUserSessionData
  ): Observable<CognitoUserSession> {
    const userData = {
      Username: sessionData.IdToken.payload['email'],
      Pool: this.userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    return new Observable((observer: any) => {
      if (!sessionData.RefreshToken) {
        observer.error('no refresh token');
        return;
      }

      cognitoUser.refreshSession(sessionData.RefreshToken, (err, session) => {
        if (err) {
          observer.error(err);
        }
        observer.next(session);
        observer.complete();
      });
    });
  }

  // public signOut(): Promise<any> {
  // }

  // public isAuthenticated(): Promise<boolean> {
  //   if (this.authenticationSubject.value) {
  //     return Promise.resolve(true);
  //   } else {
  //     return this.getUser()
  //       .then((user: any) => {
  //         if (user) {
  //           return true;
  //         } else {
  //           return false;
  //         }
  //       })
  //       .catch(() => {
  //         return false;
  //       });
  //   }
  // }

  // public getUser(): Promise<any> {
  //   return Auth.currentUserInfo();
  // }
}
