import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router'; 
import { Ticket } from 'src/app/service/ticket/ticket';
import { TicketService } from 'src/app/service/ticket/ticket.service';
import { Users } from 'src/app/service/user/user';
import { UsersService } from 'src/app/service/user/user.service';
import {MatExpansionModule} from '@angular/material/expansion';
import { Roles } from 'src/app/service/role/role';
import { RoleService } from 'src/app/service/role/role.service';
import { CreateUserComponent } from '../user-page/user-modal/create-user/create-user.component';
import { CreateRoleComponent } from './create-role/create-role.component';
@Component({
  selector: 'app-role-page',
  templateUrl: './role-page.component.html',
  styleUrls: ['./role-page.component.scss']
})
export class RolePageComponent {
  constructor(
    private roleService: RoleService,
    private ticketService: TicketService,
    private dialog: MatDialog,
    private router: Router
  ) {}
  search: Roles[] = [];
  role$: any = [];
  singleUser: number;
  ngOnInit(): void {
    //this.getAllUsers();
    this.getAllRoles();
  }
  searchForm: FormGroup = new FormGroup({
    search: new FormControl('', Validators.required),
  });
  getAllRoles() {
    this.roleService.getAllRoles().subscribe(
      (data: Roles[]) => {
        this.role$ = data;
        console.log(this.role$);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  openRoleCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true;
    dialogConfig.width =  "50%";
    dialogConfig.height =  "80%";
    dialogConfig.panelClass = 'post-dialog-container',
    this.dialog.open(CreateRoleComponent,dialogConfig);
    this.getAllRoles();
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
