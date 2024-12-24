import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitorSearchTableComponent } from './competitor-search-table.component';

describe('CompetitorSearchTableComponent', () => {
  let component: CompetitorSearchTableComponent;
  let fixture: ComponentFixture<CompetitorSearchTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompetitorSearchTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitorSearchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
