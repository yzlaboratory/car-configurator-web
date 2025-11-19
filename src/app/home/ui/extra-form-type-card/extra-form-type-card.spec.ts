import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraFormTypeCard } from './extra-form-type-card';

describe('ExtraFormTypeCard', () => {
  let component: ExtraFormTypeCard;
  let fixture: ComponentFixture<ExtraFormTypeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtraFormTypeCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ExtraFormTypeCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
