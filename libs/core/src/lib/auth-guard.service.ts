import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { CognitoService } from './cognito/cognito.service';
import { isAuthenticated } from './cognito/store/cognito.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private cognito: CognitoService,
    private router: Router,
    private store: Store
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.store.select(isAuthenticated).pipe(
      take(1),
      map((isAuth) => {
        if (route?.routeConfig?.path === 'login') {
          if (isAuth) {
            this.router.navigate(['dashboard']);
            return false;
          } else {
            return true;
          }
        }

        if (!isAuth) {
          this.router.navigate(['login']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
