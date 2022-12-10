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
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})

export class DashboardPageComponent implements OnInit {
  constructor(
    private userService: UsersService,
    private ticketService: TicketService,
    private dialog: MatDialog,
    private router: Router
  ) { }
  search: Users[] = [];
  users: Users[] = [];
  tickets: Ticket[] = [];
  singleTicket: number;
  ngOnInit(): void {
    this.getAllTicket();
  }
  searchForm: FormGroup = new FormGroup({
    search: new FormControl('', Validators.required),
  });
  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (data: Users[]) => {
        this.users = data;
        console.log(this.users);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
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
  filterItems(search: string) {
    this.users.length = 0;
    this.userService.getAllUsers().subscribe(
      (data: Users[]) => {
        this.search = data['data'];
        for (let i = 0; i < this.search.length; i++) {
        }
        if (!this.searchForm.valid) {
          this.users = this.search;
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
