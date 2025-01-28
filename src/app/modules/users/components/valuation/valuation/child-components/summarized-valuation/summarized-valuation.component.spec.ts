import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarizedValuationComponent } from './summarized-valuation.component';

describe('SummarizedValuationComponent', () => {
  let component: SummarizedValuationComponent;
  let fixture: ComponentFixture<SummarizedValuationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SummarizedValuationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummarizedValuationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
