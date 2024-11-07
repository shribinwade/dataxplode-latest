import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketTreadComponent } from './market-tread.component';

describe('MarketTreadComponent', () => {
  let component: MarketTreadComponent;
  let fixture: ComponentFixture<MarketTreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketTreadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketTreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
