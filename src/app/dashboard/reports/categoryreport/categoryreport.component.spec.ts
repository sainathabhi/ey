import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryreportComponent } from './categoryreport.component';

describe('CategoryreportComponent', () => {
  let component: CategoryreportComponent;
  let fixture: ComponentFixture<CategoryreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
