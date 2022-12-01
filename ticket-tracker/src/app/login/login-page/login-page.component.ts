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
import { ForgotComponent } from 'src/app/forgetpass/forgetpass.component';


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
  postUser: Users;
  authen: Users[]=[];
  ngOnInit(): void {  
  }
  loginForm: FormGroup = new FormGroup({
    emailLogin: new FormControl('', Validators.required, ),
    passLogin: new FormControl('', Validators.required)
  });
  registerForm: FormGroup = new FormGroup({
    registerEmailAdd: new FormControl('', Validators.required),
    registerLastName: new FormControl('', Validators.required),
    registerUserName: new FormControl('', Validators.required),
    registerFirstName: new FormControl('', Validators.required),
    registerPassword: new FormControl('', Validators.required)
  });
  onSubmitLogin(){
    
    // if(this.loginForm.invalid){
    //   this.toast.error("Complete your Login!");
    //   return;
    // }
    this.userService.getAllUsers().subscribe((data: Users[])=>{
      this.authen=data;      
    },(error: any)=>{
        this.toast.error(error); 
      });
    this.userService.getUserByEmail(this.loginForm.value.emailLogin).subscribe((data: Users)=>{
      this.postUser = data;
      if(this.postUser.password == this.loginForm.value.passLogin  ){
        this.toast.success(`Welcome ${this.postUser.user_name}!`);
        this.nav("dashboard");
      }else{
        this.toast.error("Incorrect Password!");
        return;
      }
      
    },(error: any)=>{
      this.toast.error("Invalid Login"); 
    }); 

    //end subs
    
      
      
      
  }
  onSubmitRegister(){
    if(this.registerForm.invalid){
      this.toast.error("Invalid Registration!");
      return;
    }
    const payload: Users = {
     
      email: this.registerForm.value.registerEmailAdd,
      user_name: this.registerForm.value.registerName,
      name: this.registerForm.value.registerUserName,
      password:  this.registerForm.value.registerPassword,
      image_link: this.registerForm.value.image_link,
      
    };
    this.userService.saveUser(payload).pipe(this.toast.observe({
      success: "Registered Successfully!",
      loading: "Processing",
      error: (message: any) => `${message}`
    })).subscribe((data: Users) => {
      this.postUser = data;
      this.nav("user-dashboard");
    });
    
    this.registerForm.reset();
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
      this.dialog.open(ForgotComponent,dialogConfig);
  }
}
