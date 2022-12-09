import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/service/user/user.service';
import { Users } from 'src/app/service/user/user';
@Component({
  selector: 'app-forgotpass-page',
  templateUrl: './forgotpass-page.component.html',
  styleUrls: ['./forgotpass-page.component.scss']
})
export class ForgotpassPageComponent {
  constructor(
    private router: Router,
    private toast: HotToastService,
    private userService: UsersService,
    private dialog: MatDialog
  ) {}
  isFound: boolean = false;
  users: Users[] = [];
  temp: number;
  count: number = 0;
  bool: boolean[] = [];
  ngOnInit(): void {
    this.confirmPasswordForm.controls['password'].disable();
    this.confirmPasswordForm.controls['confirmPassword'].disable();
    this.userService.getAllUsers().subscribe((data: Users[]) => {
      this.users = data['data'];
    });
  }

  checkEmail(email: string) {
    let check = 0;
    for (let i = 0; i < this.users.length; i++) {
      this.bool.push(this.users[i].email === email);
    }
    for (let i = 0; i < this.users.length; i++) {
      if (this.bool[i] == true) {
        check = i;
      }
    }
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[check].email === email) {
        this.confirmPasswordForm.controls['password'].enable();
        this.confirmPasswordForm.controls['confirmPassword'].enable();
        this.count = check;
        this.isFound = true;
      } else {
        this.confirmPasswordForm.controls['password'].disable();
        this.confirmPasswordForm.controls['confirmPassword'].disable();
        this.isFound = false;
      }
    }
    this.bool = [];
    return this.isFound;
  }
  onConfirmPassword() {
    if (!this.confirmPasswordForm.valid) {
      this.toast.error('Error Updating Password');
      return;
    }

    if (this.isFound) {
      if (
        this.confirmPasswordForm.value.password ==
        this.confirmPasswordForm.value.confirmPassword
      ) {
        this.updatePassword(this.users[this.count]);
      } else {
        this.toast.error("Password doesn't match!");
        return;
      }
    }
  }
  updatePassword(userUpdate: Users) {
    let updateFormData = new FormData();
    updateFormData.append('user_id', userUpdate.user_id.toString());
    updateFormData.append('fName', userUpdate.user_firstname.toString());
    updateFormData.append('lName', userUpdate.user_lastname.toString());
    updateFormData.append('uemail', userUpdate.email.toString());
    updateFormData.append('user_name', userUpdate.user_name.toString());
    updateFormData.append(
      'user_password',
      this.confirmPasswordForm.value.password
    );
    this.userService
      .updateUser(userUpdate.user_id)
      .pipe(
        this.toast.observe({
          success: 'Password Changed Successfully!',
          loading: 'Processing',
          error: (message: any) => `${message}`,
        })
      )
      .subscribe((data: any) => {
        this.temp = data;
      });
  }
  confirmPasswordForm: FormGroup = new FormGroup({
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });
  searchForm: FormGroup = new FormGroup({
    emailSearch: new FormControl('', Validators.required),
  });
  close() {
    this.dialog.closeAll();
  }
}
