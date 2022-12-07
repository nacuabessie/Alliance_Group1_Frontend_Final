import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.scss']
})
export class ModalCreateComponent implements OnInit{
  postTicket: Ticket;
  constructor(
    private dialog: MatDialog,
    private toast: HotToastService,
    private HttpClient: HttpClient,
    private ticketService: TicketService,
    private router: Router,
  ) { }
  ticketForm: FormGroup = new FormGroup({
    ticketsubject: new FormControl('', Validators.required),
    ticketcategory: new FormControl('', Validators.required),
    ticketdescription: new FormControl('', Validators.required),
    ticketassignee: new FormControl('', Validators.required),
    ticketID: new FormControl('', Validators.required),
    ticketsender: new FormControl('', Validators.required),
    ticketstatus: new FormControl('', Validators.required),
    ticketFile: new FormControl('', Validators.required),
    
  });
  ngOnInit(): void {
  }

  onSubmitCreate(){
    if(this.ticketForm.invalid){
      this.toast.error("Invalid Registration!");
      return;
    }
    const payload: Ticket = {
      subject: this.ticketForm.value.ticketsubject,
      category: this.ticketForm.value.ticketcategory,
      description: this.ticketForm.value.ticketdescription,
      assignee: this.ticketForm.value.ticketassignee,
      id: this.ticketForm.value.ticketID,
      sender: this.ticketForm.value.ticketsender,
      status: this.ticketForm.value.ticketstatus,
      file_location: this.ticketForm.value.ticketFile
    };
    this.ticketService.saveTicket(payload).pipe(this.toast.observe({
      success: "Ticket Created!",
      loading: "Processing",
      error: (message: any) => `${message}`
    })).subscribe((data: Ticket) => {
      this.postTicket = data;
      this.nav("ticket");
      this.close();
    });
      
  }
  close(){
    this.dialog.closeAll();
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }

}
