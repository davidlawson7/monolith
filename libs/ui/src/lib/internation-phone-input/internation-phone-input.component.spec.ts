import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationPhoneInputComponent } from './internation-phone-input.component';

describe('InternationPhoneInputComponent', () => {
  let component: InternationPhoneInputComponent;
  let fixture: ComponentFixture<InternationPhoneInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InternationPhoneInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InternationPhoneInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
