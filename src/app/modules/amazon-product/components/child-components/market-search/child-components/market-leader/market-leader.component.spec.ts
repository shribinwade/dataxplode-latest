import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketLeaderComponent } from './market-leader.component';

describe('MarketLeaderComponent', () => {
  let component: MarketLeaderComponent;
  let fixture: ComponentFixture<MarketLeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketLeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
