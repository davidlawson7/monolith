import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmiLayoutComponent } from './cmi-layout.component';

describe('CmiLayoutComponent', () => {
  let component: CmiLayoutComponent;
  let fixture: ComponentFixture<CmiLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmiLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmiLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
