import { TestBed } from '@angular/core/testing';

import { ExportTableAsExcelService } from './export-table-as-excel.service';

describe('ExportTableAsExcelService', () => {
  let service: ExportTableAsExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportTableAsExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
