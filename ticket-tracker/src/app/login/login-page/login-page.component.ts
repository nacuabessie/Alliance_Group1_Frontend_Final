
import { HotToastService } from '@ngneat/hot-toast';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Users } from 'src/app/service/user/user';
import { UsersService } from 'src/app/service/user/user.service';
import { ForgotpassPageComponent } from 'src/app/forgotpass-page/forgotpass-page.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UsersService,
    private toast: HotToastService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {


  }
  count: number = 0;
  found: boolean = false;
  toUser: Users;
  auth: Users[] = [];
  ngOnInit(): void {
  }

  form = this.fb.group({
    emailLogin: [''],
    passLogin: [''],
  });
  get f() {
    return this.form.controls;
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }
  onSubmitLogin() {
    if (this.form.invalid) {
      this.toast.error('Login Error');
      return;
    }
    this.userService.loginUser(this.f.emailLogin.value!, this.f.passLogin.value!)
      .subscribe((result) => {
        if (result['body']['data'] != null) {
          this.router.navigate(['ticket']);
        }
      });

  }

  onOpenForgot() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.panelClass = 'post-dialog-container',
      this.dialog.open(ForgotpassPageComponent, dialogConfig);
  }

  updateLoggedIn(userUpdate: Users) {
    console.log('test update', userUpdate);
    let updateFormData = new FormData();
    updateFormData.append('user_id', userUpdate.user_id.toString());
    updateFormData.append('user_firstname', userUpdate.user_firstname);
    updateFormData.append('user_lastname', userUpdate.user_lastname.toString());
    updateFormData.append('email', userUpdate.email.toString());
    updateFormData.append('user_name', userUpdate.user_name.toString());
    updateFormData.append('password', userUpdate.password);
    updateFormData.append('logged_in', 'true');
    this.userService
      .updateUser(userUpdate.user_id)
      .pipe(
        this.toast.observe({
          error: (message: any) => `${message}`,
        })
      )
      .subscribe((data: any) => {
      });
  }
}
