import { Component, Input } from '@angular/core';
import { Icons } from '@utils';

@Component({
  selector: 'nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
})
export class NavItemComponent {
  @Input() selected = false;
  @Input() icon!: Icons;
  @Input() photo!: string;
}
