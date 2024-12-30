import { TestBed } from '@angular/core/testing';

import { ExcelToJsonService } from './excel-to-json.service';

describe('ExcelToJsonService', () => {
  let service: ExcelToJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelToJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
