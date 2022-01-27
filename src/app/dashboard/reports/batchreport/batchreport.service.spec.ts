import { TestBed } from '@angular/core/testing';

import { BatchreportService } from './batchreport.service';

describe('BatchreportService', () => {
  let service: BatchreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
