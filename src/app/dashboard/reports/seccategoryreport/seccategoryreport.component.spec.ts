import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccategoryreportComponent } from './seccategoryreport.component';

describe('SeccategoryreportComponent', () => {
  let component: SeccategoryreportComponent;
  let fixture: ComponentFixture<SeccategoryreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccategoryreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccategoryreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
