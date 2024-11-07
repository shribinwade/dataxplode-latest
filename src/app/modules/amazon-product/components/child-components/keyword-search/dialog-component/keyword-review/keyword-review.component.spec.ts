import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordReviewComponent } from './keyword-review.component';

describe('KeywordReviewComponent', () => {
  let component: KeywordReviewComponent;
  let fixture: ComponentFixture<KeywordReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KeywordReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeywordReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
