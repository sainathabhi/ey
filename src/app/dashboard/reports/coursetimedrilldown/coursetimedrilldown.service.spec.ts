import { TestBed } from '@angular/core/testing';

import { CoursetimedrilldownService } from './coursetimedrilldown.service';

describe('CoursetimedrilldownService', () => {
  let service: CoursetimedrilldownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursetimedrilldownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
