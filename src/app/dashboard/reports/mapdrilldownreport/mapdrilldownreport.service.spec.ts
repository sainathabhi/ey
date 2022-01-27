import { TestBed } from '@angular/core/testing';

import { MapdrilldownreportService } from './mapdrilldownreport.service';

describe('MapdrilldownreportService', () => {
  let service: MapdrilldownreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapdrilldownreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
