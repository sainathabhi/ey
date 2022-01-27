import { TestBed } from '@angular/core/testing';

import { ThirdcategoryreportService } from './thirdcategoryreport.service';

describe('ThirdcategoryreportService', () => {
  let service: ThirdcategoryreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThirdcategoryreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
