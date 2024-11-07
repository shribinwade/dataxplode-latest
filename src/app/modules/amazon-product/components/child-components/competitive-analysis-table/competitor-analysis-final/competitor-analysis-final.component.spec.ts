import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitorAnalysisFinalComponent } from './competitor-analysis-final.component';

describe('CompetitorAnalysisFinalComponent', () => {
  let component: CompetitorAnalysisFinalComponent;
  let fixture: ComponentFixture<CompetitorAnalysisFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompetitorAnalysisFinalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitorAnalysisFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
