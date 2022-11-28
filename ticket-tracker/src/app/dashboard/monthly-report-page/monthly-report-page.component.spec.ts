import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyReportPageComponent } from './monthly-report-page.component';

describe('MonthlyReportPageComponent', () => {
  let component: MonthlyReportPageComponent;
  let fixture: ComponentFixture<MonthlyReportPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyReportPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyReportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
