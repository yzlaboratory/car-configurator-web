import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorForm } from './motor-form';

describe('MotorForm', () => {
  let component: MotorForm;
  let fixture: ComponentFixture<MotorForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotorForm],
    }).compileComponents();

    fixture = TestBed.createComponent(MotorForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
