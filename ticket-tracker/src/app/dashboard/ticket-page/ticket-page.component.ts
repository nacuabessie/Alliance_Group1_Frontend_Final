import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/service/ticket/ticket';
import { TicketService } from 'src/app/service/ticket/ticket.service';
import { Users } from 'src/app/service/user/user';

import { UsersService } from 'src/app/service/user/user.service';
import { ModalCreateComponent } from '../modal-create/modal-create.component';
import { HotToastService } from '@ngneat/hot-toast';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { ModalUpdateComponent } from '../modal-update/modal-update.component';

@Component({
  selector: 'app-ticket-page',
  templateUrl: './ticket-page.component.html',
  styleUrls: ['./ticket-page.component.scss'],
})
export class TicketPageComponent implements OnInit {
  constructor(
    private userService: UsersService,   
    private toast: HotToastService,
    private ticketService: TicketService,
    private dialog: MatDialog,
    private router: Router
  ) {}
  search: Users[] = [];
  users: Users[] = [];
  tickets: Ticket[] = [];
  singleTicket: number;
  ngOnInit(): void {
    //this.getAllUsers();
    this.getAllTicket();
  }
  displayStyle = "none";
  displayEditStyle = "none";
  
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
          // if (this.search[i].subject.toLowerCase() === search.toLowerCase()) {
          //   this.users.push(this.search[i]);
          // } else if (
          //   this.search[i].assignee.toLowerCase() === search.toLowerCase()
          // ) {
          //   this.users.push(this.search[i]);
          // } else if (
          //   this.search[i].status.toLowerCase() === search.toLowerCase()
          // ) {
          //   this.users.push(this.search[i]);
          // }
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


  openmodalCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true;
    dialogConfig.width =  "50%";
    dialogConfig.height =  "80%";
    dialogConfig.panelClass = 'post-dialog-container',
    this.dialog.open(ModalCreateComponent,dialogConfig);
    this.getAllTicket();
  }

  openModaldelete(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true;
    dialogConfig.width =  "50%";
    dialogConfig.panelClass = 'post-dialog-container',
    this.dialog.open(ModalDeleteComponent,dialogConfig);
  }

  openModalUpdate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true;
    dialogConfig.width =  "50%";
    dialogConfig.height =  "80%";
    dialogConfig.panelClass = 'post-dialog-container',
    this.dialog.open(ModalUpdateComponent,dialogConfig);
  }
  
  closePopup() {
    this.displayStyle = "none";
  }

}
