import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentureCapitalMethodComponent } from './venture-capital-method.component';

describe('VentureCapitalMethodComponent', () => {
  let component: VentureCapitalMethodComponent;
  let fixture: ComponentFixture<VentureCapitalMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VentureCapitalMethodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentureCapitalMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
