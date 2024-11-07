import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitiveStratergyComponent } from './competitive-stratergy.component';

describe('CompetitiveStratergyComponent', () => {
  let component: CompetitiveStratergyComponent;
  let fixture: ComponentFixture<CompetitiveStratergyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompetitiveStratergyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitiveStratergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
