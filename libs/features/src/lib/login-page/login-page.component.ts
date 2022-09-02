import { Component, Inject, OnInit, isDevMode, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { awsLogin, ENVIRONMENT, isAuthenticated } from '@elmdex/core';
import { Store } from '@ngrx/store';
import { CmiEnvironment, Icons } from '@utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  logo = Icons.ToyBoat;
  codes = ['+61', '+44', '+1'];

  login!: any;
  number!: string;
  password!: string;

  prefilAndLockForm = false;

  sub!: Subscription;

  constructor(
    @Inject(ENVIRONMENT) private environment: CmiEnvironment,
    private router: Router,
    private store: Store
  ) {
    if (isDevMode() && this.environment.login) {
      this.prefilAndLockForm = true;
      this.login = this.environment.login;
      this.number = `${this.environment.login.code}${this.environment.login.mobile}`;
      this.password = this.environment.login.password;
    }
  }

  ngOnInit(): void {
    this.sub = this.store.select(isAuthenticated).subscribe((authenticated) => {
      if (authenticated) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  savePassword($event: any) {
    this.password = $event.value;
  }

  savePhone($event: any) {
    if (!$event.code || !$event.number) {
      return;
    }
    this.number = `${$event.code}${$event.number}`;
  }

  onLogIn() {
    console.log({
      number: this.number,
      password: this.password,
    });

    // Do a check here to sanitize login data
    this.store.dispatch(
      awsLogin({
        metadata: {
          correlationId: Date.now().toString(),
        },
        payload: {
          password: this.password,
          phoneNumber: this.number,
        },
      })
    );
  }
}
