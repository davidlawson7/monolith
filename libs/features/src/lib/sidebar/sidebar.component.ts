import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AugmentedPageData, changePage, selectMainMenu } from '@elmdex/core';
import { Icons } from '@utils';
import { Observable } from 'rxjs';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  logo = Icons.ToyBoat;
  dataIcon = Icons.Data;
  pageIcon = Icons.Page;
  profilePhoto = 'assets/images/davidlawson.jpg';

  mainMenu$!: Observable<AugmentedPageData[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.mainMenu$ = this.store.select(selectMainMenu);
  }

  changePage(pageName: string): void {
    this.store.dispatch(
      changePage({
        metadata: {
          correlationId: Date.now().toString(),
        },
        payload: {
          pageName,
        },
      })
    );
  }
}
