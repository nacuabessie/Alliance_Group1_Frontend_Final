import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard/dashboard-page/dashboard-page.component';
import { LoginComponent } from './login/login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardPageComponent,
  },
  // {
  //   path: 'user-dashboard',
  //   component: UserDashboardComponent,
  // },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }