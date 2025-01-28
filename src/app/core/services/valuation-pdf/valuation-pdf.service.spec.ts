import { TestBed } from '@angular/core/testing';
import { ValuationPDFService } from './valuation-pdf.service';



describe('ValuationPDFService', () => {
  let service: ValuationPDFService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValuationPDFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
