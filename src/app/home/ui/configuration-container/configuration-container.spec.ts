import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationContainer } from './configuration-container';

describe('ConfigurationContainer', () => {
  let component: ConfigurationContainer;
  let fixture: ComponentFixture<ConfigurationContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurationContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
