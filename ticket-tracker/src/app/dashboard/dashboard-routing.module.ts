import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ManagementPageComponent } from './management-page/management-page.component';
import { MonthlyReportPageComponent } from './monthly-report-page/monthly-report-page.component';
import { TicketPageComponent } from './ticket-page/ticket-page.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardPageComponent,
    children:[
      {
        path: 'home', component: HomePageComponent,
      },
      {
        path: 'ticket', component: TicketPageComponent,
      },
      {
        path: 'management', component: ManagementPageComponent,
      },
      {
        path: 'monthly-report', component: MonthlyReportPageComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
