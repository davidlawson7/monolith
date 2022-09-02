import { Component, OnInit } from '@angular/core';
import { Theme } from '@elmdex/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'cmi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ibs-cmi';
  theme$!: Observable<Theme>;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  // const a = this.cognito.isAuthenticated().then((e) => {
  //   console.log('isAuth: ', e);
  // });
  // this.cognito
  //   .signIn('+61452300117', 'Meliodas1!')
  //   .subscribe((e) => console.log(e));
}
