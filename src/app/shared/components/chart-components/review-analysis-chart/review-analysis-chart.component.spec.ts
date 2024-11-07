import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAnalysisChartComponent } from './review-analysis-chart.component';

describe('ReviewAnalysisChartComponent', () => {
  let component: ReviewAnalysisChartComponent;
  let fixture: ComponentFixture<ReviewAnalysisChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewAnalysisChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewAnalysisChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
