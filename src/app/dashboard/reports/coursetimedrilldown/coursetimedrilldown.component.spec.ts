import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursetimedrilldownComponent } from './coursetimedrilldown.component';

describe('CoursetimedrilldownComponent', () => {
  let component: CoursetimedrilldownComponent;
  let fixture: ComponentFixture<CoursetimedrilldownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursetimedrilldownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursetimedrilldownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
