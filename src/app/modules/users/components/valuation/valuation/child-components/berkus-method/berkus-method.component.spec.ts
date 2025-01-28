import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BerkusMethodComponent } from './berkus-method.component';

describe('BerkusMethodComponent', () => {
  let component: BerkusMethodComponent;
  let fixture: ComponentFixture<BerkusMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BerkusMethodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BerkusMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
