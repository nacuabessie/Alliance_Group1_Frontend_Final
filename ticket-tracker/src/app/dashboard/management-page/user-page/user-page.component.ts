import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/service/ticket/ticket';
import { TicketService } from 'src/app/service/ticket/ticket.service';
import { Users } from 'src/app/service/user/user';
import { UsersService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {
  constructor(
    private userService: UsersService,
    private ticketService: TicketService,
    private dialog: MatDialog,
    private router: Router
  ) {}
  search: Users[] = [];
  user$: any = [];
  tickets: Ticket[] = [];
  img = this.user$.user_image;
  singleUser: number;
  ngOnInit(): void {
    //this.getAllUsers();
    this.getAllUsers();
  }
  searchForm: FormGroup = new FormGroup({
    search: new FormControl('', Validators.required),
  });
  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (data: Users[]) => {
        this.user$ = data;
        console.log(this.user$);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  filterItems(search: string) {
    this.user$.length = 0;
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
          this.user$ = this.search;
        }
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
  closePopup() {
    this.displayStyle = "none";
  }

}
