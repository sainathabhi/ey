import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProonereportComponent } from './proonereport.component';

describe('ProonereportComponent', () => {
  let component: ProonereportComponent;
  let fixture: ComponentFixture<ProonereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProonereportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProonereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
