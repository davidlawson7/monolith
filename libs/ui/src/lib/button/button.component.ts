import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ui-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Output() clicked = new EventEmitter();

  @Input() width: 'full' | 'default' = 'default';

  ngOnInit(): void {}
}
