import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEntrantsComponent } from './new-entrants.component';

describe('NewEntrantsComponent', () => {
  let component: NewEntrantsComponent;
  let fixture: ComponentFixture<NewEntrantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewEntrantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEntrantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
