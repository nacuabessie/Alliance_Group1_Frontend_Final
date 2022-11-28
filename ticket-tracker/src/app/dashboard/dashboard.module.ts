import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TicketPageComponent } from './ticket-page/ticket-page.component';
import { ManagementPageComponent } from './management-page/management-page.component';
import { MonthlyReportPageComponent } from './monthly-report-page/monthly-report-page.component';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardPageComponent,
    HomePageComponent,
    TicketPageComponent,
    ManagementPageComponent,
    MonthlyReportPageComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
