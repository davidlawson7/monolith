import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent implements OnInit {
  @Input() initialValue = true;
  @Output() event = new EventEmitter<boolean>();

  value!: boolean;

  constructor() {}

  ngOnInit(): void {
    this.value = this.initialValue;
  }

  onChange(value: boolean) {
    this.value = value;
    this.event.emit(this.value);
  }
}
