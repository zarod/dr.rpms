import { TestBed } from '@angular/core/testing';

import { IotaService } from './iota.service';

describe('IotaService', () => {
  let service: IotaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IotaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
