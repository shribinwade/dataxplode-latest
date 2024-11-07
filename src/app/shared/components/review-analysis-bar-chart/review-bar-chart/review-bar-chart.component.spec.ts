import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewBarChartComponent } from './review-bar-chart.component';

describe('ReviewBarChartComponent', () => {
  let component: ReviewBarChartComponent;
  let fixture: ComponentFixture<ReviewBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewBarChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
