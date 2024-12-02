import { TestBed } from '@angular/core/testing';

import { SaveServiceDataService } from './save-service-data.service';

describe('SaveServiceDataService', () => {
  let service: SaveServiceDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveServiceDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
