import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorSearchComponent } from './distributor-search.component';

describe('DistributorSearchComponent', () => {
  let component: DistributorSearchComponent;
  let fixture: ComponentFixture<DistributorSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DistributorSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributorSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
