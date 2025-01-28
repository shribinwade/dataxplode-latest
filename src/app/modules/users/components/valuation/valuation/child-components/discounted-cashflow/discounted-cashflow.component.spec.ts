import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountedCashflowComponent } from './discounted-cashflow.component';

describe('DiscountedCashflowComponent', () => {
  let component: DiscountedCashflowComponent;
  let fixture: ComponentFixture<DiscountedCashflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscountedCashflowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountedCashflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
