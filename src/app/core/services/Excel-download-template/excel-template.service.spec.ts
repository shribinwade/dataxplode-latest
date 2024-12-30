import { TestBed } from '@angular/core/testing';

import { ExcelTemplateService } from './excel-template.service';

describe('ExcelTemplateService', () => {
  let service: ExcelTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
