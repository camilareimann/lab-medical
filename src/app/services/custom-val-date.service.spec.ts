import { TestBed } from '@angular/core/testing';

import { CustomValDateService } from './custom-val-date.service';

describe('CustomValDateService', () => {
  let service: CustomValDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomValDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
