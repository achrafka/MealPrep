import { TestBed } from '@angular/core/testing';

import { SocialloginService } from './sociallogin.service';

describe('SocialloginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocialloginService = TestBed.get(SocialloginService);
    expect(service).toBeTruthy();
  });
});
