import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributedSearchTableComponent } from './distributed-search-table.component';

describe('DistributedSearchTableComponent', () => {
  let component: DistributedSearchTableComponent;
  let fixture: ComponentFixture<DistributedSearchTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DistributedSearchTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributedSearchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
