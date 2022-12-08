import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ManagementPageComponent } from './management-page/management-page.component';
import { RequestPageComponent } from './management-page/request-page/request-page.component';
import { RolePageComponent } from './management-page/role-page/role-page.component';
import { UserPageComponent } from './management-page/user-page/user-page.component';
//import { ManagementPageComponent } from '../Management-page/user-page/user-page.component';
import { MonthlyReportPageComponent } from './monthly-report-page/monthly-report-page.component';
import { TicketPageComponent } from './ticket-page/ticket-page.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardPageComponent,
    children: []

  },
  
  {
    path: 'home', component: HomePageComponent,
      
  },

  {
    path: 'ticket', component: TicketPageComponent,
  },

  {
    path: 'management', component: ManagementPageComponent,
    children: []
  },

  {
    path: 'management/user', component: UserPageComponent,
  },

  {
    path: 'management/role', component: RolePageComponent,
  },

  {
    path: 'management/request', component: RequestPageComponent,
  },
  
  {
    path: 'monthly-report', component: MonthlyReportPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
