import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Ticket } from 'src/app/service/ticket/ticket';
import { TicketService } from 'src/app/service/ticket/ticket.service';
import { HttpClient } from '@angular/common/http';
import { RoleService } from 'src/app/service/role/role.service';
@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent {
   // postTicket: Ticket;
  // refreshTicket: Ticket[] = [];
  constructor(
    private dialog: MatDialog,
    private toast: HotToastService,
    private HttpClient: HttpClient,
    private roleService: RoleService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  users: any[] = [];

    form_role = this.fb.group({
      roleid:[''],
      roledescription:[''],
      roleinitials:[''],
    })

    get f(){
      return this.form_role.controls;
    }

    onRoleCreate(){
      let roleData: FormData = new FormData();


      roleData.append('roleid', this.f.roleid.value!);
      roleData.append('description', this.f.roledescription.value!);
      roleData.append('initials', this.f.roleinitials.value!);
      
      console.log(roleData);

      this.roleService.saveRole(roleData).subscribe(result =>{})
      this.close();

    }

    selectedassignee: string='';

    chooseAssignee(assignee: any){
      this.selectedassignee = assignee.target.value;
    }
  ngOnInit(): void {
    console.log("NGONINIT")
    this.roleService.getAllRoles().subscribe((result) => {
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
