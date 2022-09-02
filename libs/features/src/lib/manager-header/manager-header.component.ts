import { Component } from '@angular/core';
import { selectTheme, setDarkTheme, Theme } from '@elmdex/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

@Component({
  selector: 'cmi-manager-header',
  templateUrl: './manager-header.component.html',
  styleUrls: ['./manager-header.component.scss'],
})
export class ManagerHeaderComponent {
  initialThemeValue = false;

  constructor(private store: Store) {
    this.store
      .select(selectTheme)
      .pipe(take(1))
      .subscribe((theme) => (this.initialThemeValue = theme === Theme.light));
  }

  toggledTheme(value: boolean) {
    this.store.dispatch(
      setDarkTheme({
        metadata: {
          correlationId: Date.now().toString(),
        },
        payload: {
          theme: value ? Theme.light : Theme.dark,
        },
      })
    );
  }
}
