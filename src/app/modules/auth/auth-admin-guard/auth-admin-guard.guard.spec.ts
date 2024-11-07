import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authAdminGuardGuard } from './auth-admin-guard.guard';

describe('authAdminGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authAdminGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
