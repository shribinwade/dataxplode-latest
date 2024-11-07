import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPowerComponent } from './customer-power.component';

describe('CustomerPowerComponent', () => {
  let component: CustomerPowerComponent;
  let fixture: ComponentFixture<CustomerPowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerPowerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerPowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
