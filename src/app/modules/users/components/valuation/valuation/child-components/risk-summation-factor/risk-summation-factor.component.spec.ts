import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskSummationFactorComponent } from './risk-summation-factor.component';

describe('RiskSummationFactorComponent', () => {
  let component: RiskSummationFactorComponent;
  let fixture: ComponentFixture<RiskSummationFactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RiskSummationFactorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskSummationFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
