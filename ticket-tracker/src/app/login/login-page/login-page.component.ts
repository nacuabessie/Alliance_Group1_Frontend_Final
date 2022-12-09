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
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Users } from 'src/app/service/user/user';
import { UsersService } from 'src/app/service/user/user.service';
import { ForgotpassPageComponent } from 'src/app/forgotpass-page/forgotpass-page.component';
import { get } from 'jquery';

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
  count : number = 0;
  found : boolean = false;
  toUser: Users;
  auth: Users[]=[];
  ngOnInit(): void {  
    this.loginForm.value.emailLogin
  }
  loginForm: FormGroup = new FormGroup({
    emailLogin: new FormControl('', Validators.required, ),
    passLogin: new FormControl('', Validators.required)
  });
 form = this.fb.group({
  emailLogin:[''],
  passLogin: [''],
});
get f(){
  return this.form.controls;
}
nav(destination: string) {
  this.router.navigate([destination]);
}
  onSubmitLogin(){
    if(this.form.invalid){
      return;
    }
    // let formData: FormData = new FormData();
    // formData.append('email', this.f.emailLogin.value!);
    //   formData.append('password', this.f.passLogin.value!);
 if (this.loginForm.invalid) {
      this.toast.error('Complete your Login!');
      return;
    }
    this.userService.getUser(Number(this.toUser.user_id))
    .subscribe((result)=>{
      if(result['body']['data']!=null){
        this.router.navigate(['dashboard']);
      }
    });

    
   
    // this.userService.getAllUsers().subscribe(
    //   (data: Users[]) => {
    //     this.auth = data;
    //   },
    //   (error: any) => {
    //     this.toast.error(error);
    //   }
    // );
    
    // this.userService.getUser(this.toUser.user_id).subscribe(
    //   (data: Users) => {
    //     this.toUser = data['data']; 
    //     if (this.toUser.email == this.loginForm.value.emailLogin) {
    //     if (this.toUser.password == this.loginForm.value.passLogin) {
          
    //       // this.toast.success(`Welcome ${this.toUser.user_firstname}!`);
    //       this.toUser.logged_in = 'true';
    //       this.updateLoggedIn(this.toUser);
    //       if (this.toUser.role_id == 1) {
    //         this.nav('/admin');
    //       } else if (this.toUser.role_id == 2) {
    //         this.nav('/client');
    //       }

    //       this.userService.getPassUserValue(this.toUser);
    //     } else {
    //       this.toast.error('Incorrect Password!');
    //       return;
    //     }
    //   }
    // },
    //   (error: any) => {
    //     this.toast.error('Invalid Login');
    //   }
    // );


    //end subs
    
      
      
      
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
      .subscribe((data:any) => {
        //this.temp = data;
      });
  }
}
