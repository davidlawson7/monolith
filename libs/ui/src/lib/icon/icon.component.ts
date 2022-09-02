import { Component, Input, OnInit } from '@angular/core';
import { Icons } from '@utils';

@Component({
  selector: 'ui-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit {
  @Input() icon!: Icons;
  @Input() size = 20;

  iconPath = '';

  constructor() {}

  ngOnInit(): void {
    this.iconPath = `assets/images/icons/${this.icon}.svg`;
  }
}
