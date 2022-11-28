import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HotToastModule } from '@ngneat/hot-toast';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // HttpClientModule,
    // FormsModule,
    // ReactiveFormsModule,
    // MatToolbarModule,
    // MatButtonModule,
    // MatDialogModule,
    // MatInputModule,
    // HotToastModule.forRoot(),
    // BrowserAnimationsModule,
    // DashboardModule,
  ],

  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule  
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
