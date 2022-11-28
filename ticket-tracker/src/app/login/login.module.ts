import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    //LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule
  ],
  exports:[
    LoginComponent
  ]
})
export class LoginModule { }
