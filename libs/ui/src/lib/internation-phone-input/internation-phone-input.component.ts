import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'internation-phone-input',
  templateUrl: './internation-phone-input.component.html',
  styleUrls: ['./internation-phone-input.component.scss'],
})
export class InternationPhoneInputComponent implements OnInit {
  @Input() countryPhoneCodes: string[] = [];
  @Input() label = 'Mobile';

  @Input() prefilledData!: { code: string; number: string };

  @Output() phoneNumberDetails = new EventEmitter();

  intCode!: string;
  phoneNumber!: string;

  constructor() {}

  ngOnInit(): void {
    if (this.prefilledData) {
      this.intCode = this.prefilledData.code;
      this.phoneNumber = this.prefilledData.number;
    } else {
      this.intCode = this.countryPhoneCodes[0];
    }
  }

  onChange() {
    this.phoneNumberDetails.emit({
      code: this.intCode,
      number: this.phoneNumber,
    });
  }
}
