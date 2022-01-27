import { TestBed } from '@angular/core/testing';

import { ProonereportService } from './proonereport.service';

describe('ProonereportService', () => {
  let service: ProonereportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProonereportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
