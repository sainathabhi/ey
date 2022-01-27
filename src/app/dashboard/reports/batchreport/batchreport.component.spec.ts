import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchreportComponent } from './batchreport.component';

describe('BatchreportComponent', () => {
  let component: BatchreportComponent;
  let fixture: ComponentFixture<BatchreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
