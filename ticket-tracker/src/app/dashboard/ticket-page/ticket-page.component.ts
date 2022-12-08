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
  selector: 'app-ticket-page',
  templateUrl: './ticket-page.component.html',
  styleUrls: ['./ticket-page.component.scss']
})
export class TicketPageComponent implements OnInit {
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
  

  displayStyle = "none";
  displayEditStyle = "none";
  openPopup() {
    this.displayStyle = "block";
  }

}
