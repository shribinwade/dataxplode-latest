import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSearchTableComponent } from './review-search-table.component';

describe('ReviewSearchTableComponent', () => {
  let component: ReviewSearchTableComponent;
  let fixture: ComponentFixture<ReviewSearchTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewSearchTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewSearchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
