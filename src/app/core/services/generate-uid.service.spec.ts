import { TestBed } from '@angular/core/testing';

import { GenerateUidService } from './generate-uid.service';

describe('GenerateUidService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenerateUidService = TestBed.get(GenerateUidService);
    expect(service).toBeTruthy();
  });
});
