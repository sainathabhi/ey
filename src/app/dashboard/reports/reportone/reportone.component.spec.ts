import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportoneComponent } from './reportone.component';

describe('ReportoneComponent', () => {
  let component: ReportoneComponent;
  let fixture: ComponentFixture<ReportoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
