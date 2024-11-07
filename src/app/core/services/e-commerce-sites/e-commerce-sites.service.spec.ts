import { TestBed } from '@angular/core/testing';

import { ECommerceSitesService } from './e-commerce-sites.service';

describe('ECommerceSitesService', () => {
  let service: ECommerceSitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ECommerceSitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
