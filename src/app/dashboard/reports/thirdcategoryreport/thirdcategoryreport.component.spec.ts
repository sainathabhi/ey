import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdcategoryreportComponent } from './thirdcategoryreport.component';

describe('ThirdcategoryreportComponent', () => {
  let component: ThirdcategoryreportComponent;
  let fixture: ComponentFixture<ThirdcategoryreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThirdcategoryreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdcategoryreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
