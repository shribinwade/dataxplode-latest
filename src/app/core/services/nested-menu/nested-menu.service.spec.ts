import { TestBed } from '@angular/core/testing';

import { NestedMenuService } from './nested-menu.service';

describe('NestedMenuService', () => {
  let service: NestedMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NestedMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
