import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreatOfSubtitutesComponent } from './threat-of-subtitutes.component';

describe('ThreatOfSubtitutesComponent', () => {
  let component: ThreatOfSubtitutesComponent;
  let fixture: ComponentFixture<ThreatOfSubtitutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThreatOfSubtitutesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreatOfSubtitutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
