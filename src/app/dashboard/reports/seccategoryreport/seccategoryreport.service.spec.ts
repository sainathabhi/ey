import { TestBed } from '@angular/core/testing';

import { SeccategoryreportService } from './seccategoryreport.service';

describe('SeccategoryreportService', () => {
  let service: SeccategoryreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeccategoryreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
