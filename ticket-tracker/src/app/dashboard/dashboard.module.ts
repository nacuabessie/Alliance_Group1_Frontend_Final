import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TicketPageComponent } from './ticket-page/ticket-page.component';
//import { ManagementPageComponent } from '../Management-page/user-page/user-page.component';
import { MonthlyReportPageComponent } from './monthly-report-page/monthly-report-page.component';

import { ReactiveFormsModule } from '@angular/forms';

import { ModalCreateComponent } from './modal-create/modal-create.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule} from '@angular/material/card';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { ModalUpdateComponent } from './modal-update/modal-update.component';
import { ModalViewTicketsComponent } from './modal-view-tickets/modal-view-tickets.component';

import { ManagementPageComponent } from './management-page/management-page.component';



@NgModule({
  declarations: [
    DashboardPageComponent,
    HomePageComponent,
    TicketPageComponent,
    ManagementPageComponent,
    MonthlyReportPageComponent,
    ModalCreateComponent,
    ModalDeleteComponent,
    ModalUpdateComponent,
    ModalViewTicketsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule
  ],

  exports: [
    DashboardPageComponent
  ]
})
export class DashboardModule { }
