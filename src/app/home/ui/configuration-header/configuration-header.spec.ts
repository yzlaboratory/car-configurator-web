import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationHeader } from './configuration-header';

describe('ConfigurationHeader', () => {
  let component: ConfigurationHeader;
  let fixture: ComponentFixture<ConfigurationHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurationHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
