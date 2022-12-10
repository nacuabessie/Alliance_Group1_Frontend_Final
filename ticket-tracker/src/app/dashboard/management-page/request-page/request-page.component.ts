
import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Ticket } from 'src/app/service/ticket/ticket';
import { TicketService } from 'src/app/service/ticket/ticket.service';
import { Users } from 'src/app/service/user/user';

import { UsersService } from 'src/app/service/user/user.service';
import { RequestModalCreateComponent } from './request-modal-create/request-modal-create.component';
@Component({
  selector: 'app-request-page',
  templateUrl: './request-page.component.html',
  styleUrls: ['./request-page.component.scss']
})
export class RequestPageComponent {
  constructor(
    private userService: UsersService,
    private ticketService: TicketService,
    private dialog: MatDialog,
    private router: Router,
    private toast: HotToastService,
  ) { }
  tickets: Ticket[] = [];
  singleTicket: number;
  ngOnInit(): void {
    this.getAllTicket();
  }

  searchForm: FormGroup = new FormGroup({
    search: new FormControl('', Validators.required),
  });
  getAllTicket() {
    this.ticketService.getAllTickets().subscribe(
      (data: Ticket[]) => {
        this.tickets = data['data'];
        console.log(this.tickets);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  updateTicket(ticket: Ticket) {
  }

  openmodalCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "80%";
    dialogConfig.panelClass = 'post-dialog-container',
      this.dialog.open(RequestModalCreateComponent, dialogConfig);
    this.getAllTicket();
  }

  displayStyle = "none";
  displayEditStyle = "none";
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

}
