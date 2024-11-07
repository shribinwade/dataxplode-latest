import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BcgMatrixChartComponent } from './bcg-matrix-chart.component';

describe('BcgMatrixChartComponent', () => {
  let component: BcgMatrixChartComponent;
  let fixture: ComponentFixture<BcgMatrixChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BcgMatrixChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BcgMatrixChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
