import { TestBed } from '@angular/core/testing';

import { EncryptedOrbitdbService } from './encrypted-orbitdb.service';

describe('EncryptedOrbitdbService', () => {
  let service: EncryptedOrbitdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryptedOrbitdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
