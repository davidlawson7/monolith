import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputOutput } from './input.models';

@Component({
  selector: 'ui-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() label!: string;
  @Input() type = 'text';
  @Input() name = 'unamed_input';
  @Input() prefilledData!: string;

  @Output() keyDown = new EventEmitter<InputOutput>();

  value!: string;

  constructor() {}

  ngOnInit(): void {
    if (this.prefilledData) {
      this.value = this.prefilledData;
    }
  }

  onChange(value: any) {
    if (value?.key === 'Enter') {
      this.keyDown.emit({ value: this.value, enter: true });
    } else {
      this.keyDown.emit({ value: this.value, enter: false });
    }
  }
}
