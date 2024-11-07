import { TestBed } from '@angular/core/testing';

import { AmazonProductService } from './amazon-product.service';

describe('AmazonProductService', () => {
  let service: AmazonProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmazonProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
