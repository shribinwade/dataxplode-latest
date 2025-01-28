import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningMultiplierMethodComponent } from './earning-multiplier-method.component';

describe('EarningMultiplierMethodComponent', () => {
  let component: EarningMultiplierMethodComponent;
  let fixture: ComponentFixture<EarningMultiplierMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EarningMultiplierMethodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EarningMultiplierMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
