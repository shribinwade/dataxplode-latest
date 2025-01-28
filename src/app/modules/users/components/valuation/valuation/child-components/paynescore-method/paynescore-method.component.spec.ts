import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaynescoreMethodComponent } from './paynescore-method.component';

describe('PaynescoreMethodComponent', () => {
  let component: PaynescoreMethodComponent;
  let fixture: ComponentFixture<PaynescoreMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaynescoreMethodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaynescoreMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
