import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';

import {MatExpansionModule} from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { LoginComponent } from './login/login-page/login-page.component';

import { MatSidenavModule } from '@angular/material/sidenav';
//import { UsersService } from './../services/users/users.service';
//import { HotToastService } from '@ngneat/hot-toast';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon'
import { HotToastModule } from '@ngneat/hot-toast';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserPageComponent } from './dashboard/management-page/user-page/user-page.component';
import { RolePageComponent } from './dashboard/management-page/role-page/role-page.component';
import { RequestPageComponent } from './dashboard/management-page/request-page/request-page.component';
import { ForgotpassPageComponent } from './forgotpass-page/forgotpass-page.component';
import { ModalCreateComponent } from './dashboard/ticket-page/modal-create/modal-create.component';
import { MatDividerModule } from '@angular/material/divider';
import { CreateUserComponent } from './dashboard/management-page/user-page/user-modal/create-user/create-user.component';
import { CreateRoleComponent } from './dashboard/management-page/role-page/create-role/create-role.component';
//import { UserPageComponent } from './app/user-page/user-page.component';
//import { ManagementPageComponent } from './Management-page/user-page/user-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotpassPageComponent,
    UserPageComponent,
    RolePageComponent,
    RequestPageComponent,
    ForgotpassPageComponent,
    ModalCreateComponent,
    CreateUserComponent,
    CreateRoleComponent
    //LoginPageComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule
  ],
  imports: [
    MatExpansionModule,
    CommonModule,
    MatSidenavModule,
    ReactiveFormsModule,
    //LoginModule,
    MatDividerModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    HotToastModule.forRoot(),
    BrowserAnimationsModule,
    DashboardModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
