// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { AuthServiceService } from 'src/app/auth-service.service';

// @Component({
//   selector: 'app-login-page',
//   templateUrl: './login-page.component.html',
//   styleUrls: ['./login-page.component.scss']
// })
// export class LoginPageComponent implements OnInit {
//   formGroup!: FormGroup;

//   constructor(private authService:AuthServiceService) { }

//   ngOnInit(): void {
//     this.initForm
//   }
//   initForm(){
//     this.formGroup= new FormGroup({
//       email: new FormControl('',[Validators.required]),
//       password: new FormControl('',[Validators.required]),
//     })
//   }
//   loginProcess(){
//     if(this.formGroup.valid){
//       this.authService.login(this.formGroup.value).subscribe(result=>{
//         if(result.success){
//           alert(result.message);
//         }
//         else{
//           alert(result.message);
//         }
//       });
//     }
//   }
//   //displayStyle = "none";
//   // openPopup() {
//   //   this.displayStyle = "block";
//   // }
//   // closePopup() {
//   //   this.displayStyle = "none";
//   // }
// }


import { HotToastService } from '@ngneat/hot-toast';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
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
    ) { 

   
  }
  count : number = 0;
  found : boolean = false;
  toUser: Users;
  auth: Users[]=[];
  ngOnInit(): void {  
  }
  loginForm: FormGroup = new FormGroup({
    emailLogin: new FormControl('', Validators.required, ),
    passLogin: new FormControl('', Validators.required)
  });
 
  onSubmitLogin(){
    
    if (this.loginForm.invalid) {
      this.toast.error('Complete your Login!');
      return;
    }
    this.userService.getAllUsers().subscribe(
      (data: Users[]) => {
        this.auth = data;
      },
      (error: any) => {
        this.toast.error(error);
      }
    );
    this.userService.getUserByEmail(this.loginForm.value.emailLogin).subscribe(
      (data: Users) => {
        this.toUser = data['data'];
        if (this.toUser.password == this.loginForm.value.passLogin) {
          console.log(this.toUser);
          this.toast.success(`Welcome ${this.toUser.user_firstname}!`);
          this.toUser.logged_in = 'true';
          this.updateLoggedIn(this.toUser);

          this.nav('/client');

          this.userService.getPassUserValue(this.toUser);
        } else {
          this.toast.error('Incorrect Password!');
          return;
        }
      },
      (error: any) => {
        this.toast.error('Invalid Login');
      }
    );

    //end subs
    
      
      
      
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }
  onOpenForgot( ){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true
      dialogConfig.autoFocus = true;
      dialogConfig.width =  "60%";
      dialogConfig.panelClass = 'post-dialog-container',
      this.dialog.open(ForgotpassPageComponent,dialogConfig);
  }

  updateLoggedIn(userUpdate: Users) {
    console.log('test update', userUpdate);
    let updateFormData = new FormData();
    updateFormData.append('user_id', userUpdate.user_id.toString());
    updateFormData.append('fName', userUpdate.user_firstname);
    updateFormData.append('lName', userUpdate.user_lastname.toString());
    updateFormData.append('email', userUpdate.email.toString());
    updateFormData.append('user_name', userUpdate.user_name.toString());
    updateFormData.append('password', userUpdate.password);
    updateFormData.append('logged_in', 'true');
    this.userService
      .updateUser(updateFormData)
      .pipe(
        this.toast.observe({
          error: (message: any) => `${message}`,
        })
      )
      .subscribe((data: number) => {
        //this.temp = data;
      });
  }
}
