import { TestBed } from '@angular/core/testing';

import { CategoryreportService } from './categoryreport.service';

describe('CategoryreportService', () => {
  let service: CategoryreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
