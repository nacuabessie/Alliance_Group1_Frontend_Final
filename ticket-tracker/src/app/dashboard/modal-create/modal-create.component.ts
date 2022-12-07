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
  selector: 'app-modal-create',
  providers: [ UsersService ],
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.scss']
})
export class ModalCreateComponent implements OnInit{

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

    form = this.fb.group({
      ticketstatus:[''],
      ticketsubject:[''],
      ticketdescription:[''],
      ticketcategory:[''],
      ticketdeadline:[''],
      ticketassignee:[''],
      ticketfile:[''],
    })

    get f(){
      return this.form.controls;
    }

    onSubmitCreate(){
      let formData: FormData = new FormData();

      formData.append('assignee', this.selectedassignee);
      formData.append('status', '1');
      formData.append('subject', this.f.ticketsubject.value!);
      formData.append('category', this.f.ticketcategory.value!);
      formData.append('description', this.f.ticketdescription.value!);
      formData.append('deadline', this.f.ticketdeadline.value!);
      formData.append('document_Path', this.f.ticketfile.value!);
      formData.append('sender', '1')
      
      console.log(formData);

      this.ticketService.saveTicket(formData).subscribe(result =>{})
      this.close();

    }

    selectedassignee: string='';

    chooseAssignee(assignee: any){
      this.selectedassignee = assignee.target.value;
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
