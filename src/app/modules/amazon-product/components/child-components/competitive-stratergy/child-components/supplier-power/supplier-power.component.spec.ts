import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPowerComponent } from './supplier-power.component';

describe('SupplierPowerComponent', () => {
  let component: SupplierPowerComponent;
  let fixture: ComponentFixture<SupplierPowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupplierPowerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierPowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
