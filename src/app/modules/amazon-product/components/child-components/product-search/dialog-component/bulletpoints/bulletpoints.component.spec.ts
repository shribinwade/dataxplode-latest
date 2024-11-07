import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletpointsComponent } from './bulletpoints.component';

describe('BulletpointsComponent', () => {
  let component: BulletpointsComponent;
  let fixture: ComponentFixture<BulletpointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BulletpointsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulletpointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
