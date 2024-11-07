import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsSearchResultComponent } from './news-search-result.component';

describe('NewsSearchResultComponent', () => {
  let component: NewsSearchResultComponent;
  let fixture: ComponentFixture<NewsSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsSearchResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
