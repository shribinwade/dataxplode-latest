import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitorRivalsComponent } from './competitor-rivals.component';

describe('CompetitorRivalsComponent', () => {
  let component: CompetitorRivalsComponent;
  let fixture: ComponentFixture<CompetitorRivalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompetitorRivalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitorRivalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
