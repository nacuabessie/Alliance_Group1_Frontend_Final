
import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/service/ticket/ticket';
import { TicketService } from 'src/app/service/ticket/ticket.service';
import { Users } from 'src/app/service/user/user';

import { UsersService } from 'src/app/service/user/user.service';
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
    private router: Router
  ) {}
  tickets: Ticket[] = [];
  singleTicket: number;
  ngOnInit(): void {
    //this.getAllUsers();
    this.getAllTicket();
  }

  searchForm: FormGroup = new FormGroup({
    search: new FormControl('', Validators.required),
  });
  // getAllUsers() {
  //   this.userService.getAllUsers().subscribe(
  //     (data: Users[]) => {
  //       this.users = data;
  //       console.log(this.users);
  //     },
  //     (error: any) => {
  //       console.error(error);
  //     }
  //   );
  // }
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
    //   const payload: Ticket = {
    //     assignee: "asd",
    //     tracker: "3test",
    //     description: "5",
    //     subject: "6",
    //     status: "Resolved",
    //   };
    //   this.ticketService.updateTicket(ticket_id,payload).subscribe((data: number)=>{
    //     this.singleTicket = data;
    //     this.getAllTicket();
    //   });
    //

    // console.log(`from ticket ${ticket.id}`);
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = false;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = '60%';
    // (dialogConfig.panelClass = 'post-dialog-container'),
    //   this.dialog.open(UpdateTicketComponent, dialogConfig);
    // console.log(`ticket ${ticket}`);
    // this.ticketService.getPassTicketValue(ticket);
  }

  displayStyle = "none";
  displayEditStyle = "none";
  openPopup() {
    this.displayStyle = "block";
  }

}
