import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapdrilldownreportComponent } from './mapdrilldownreport.component';

describe('MapdrilldownreportComponent', () => {
  let component: MapdrilldownreportComponent;
  let fixture: ComponentFixture<MapdrilldownreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapdrilldownreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapdrilldownreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
