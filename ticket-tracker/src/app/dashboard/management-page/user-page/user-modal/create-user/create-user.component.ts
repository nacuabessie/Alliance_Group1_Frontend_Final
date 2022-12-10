import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Ticket } from 'src/app/service/ticket/ticket';
import { TicketService } from 'src/app/service/ticket/ticket.service';
import { HttpClient } from '@angular/common/http';
import { Users } from 'src/app/service/user/user';
import { UsersService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-create-user',
  providers: [ UsersService ],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit{

  // postTicket: Ticket;
  // refreshTicket: Ticket[] = [];
  constructor(
    private dialog: MatDialog,
    private toast: HotToastService,
    private HttpClient: HttpClient,
    private ticketService: TicketService,
    private userService: UsersService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  users: any[] = [];

    form_req = this.fb.group({
      username:[''],
      firstname:[''],
      lastname:[''],
      email:[''],
      password:[''],
    })

    get f(){
      return this.form_req.controls;
    }

    onUserCreate(){
      let formData: FormData = new FormData();

      formData.append('username', this.f.username.value!);
      formData.append('firstname', this.f.firstname.value!);
      formData.append('lastname', this.f.lastname.value!);
      formData.append('email', this.f.email.value!);
      formData.append('password', this.f.password.value!);
      console.log(formData);

      this.userService.saveUser(formData).subscribe(result =>{});
      location.reload();
      this.close();

    }

    
  ngOnInit(): void {
    console.log("NGONINIT")
    this.userService.getAllUsers().subscribe((result) => {
      this.users = result['data'];
    })
  }

 
       
  close(){
    this.dialog.closeAll();
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }

}