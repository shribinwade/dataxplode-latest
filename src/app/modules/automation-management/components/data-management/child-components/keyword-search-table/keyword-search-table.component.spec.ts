import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordSearchTableComponent } from './keyword-search-table.component';

describe('KeywordSearchTableComponent', () => {
  let component: KeywordSearchTableComponent;
  let fixture: ComponentFixture<KeywordSearchTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KeywordSearchTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeywordSearchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
