import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RimForm } from './rim-form';

describe('RimForm', () => {
  let component: RimForm;
  let fixture: ComponentFixture<RimForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RimForm],
    }).compileComponents();

    fixture = TestBed.createComponent(RimForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
