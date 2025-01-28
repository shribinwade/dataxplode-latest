import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupsMethodComponent } from './startups-method.component';

describe('StartupsMethodComponent', () => {
  let component: StartupsMethodComponent;
  let fixture: ComponentFixture<StartupsMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartupsMethodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartupsMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
