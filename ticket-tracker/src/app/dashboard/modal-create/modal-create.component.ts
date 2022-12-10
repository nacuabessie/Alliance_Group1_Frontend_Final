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
import { CategoryService } from 'src/app/service/category/category.service';

@Component({
  selector: 'app-modal-create',
  providers: [ UsersService, CategoryService],
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
    private categoryService: CategoryService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  users: any[] = [];
  categors: any[] = [];

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
      formData.append('category', this.selectedcategory);
      formData.append('description', this.f.ticketdescription.value!);
      formData.append('deadline', this.f.ticketdeadline.value!);
      formData.append('document_Path', this.f.ticketfile.value!);
      formData.append('sender', '1')
      
      console.log(formData);

      this.ticketService.saveTicket(formData).subscribe(result =>{})
      this.close();

    }

    selectedassignee: string='';
    selectedcategory: string='';

    chooseAssignee(assignee: any){
      this.selectedassignee = assignee.target.value;
    }

    chooseCategory(category: any){
      this.selectedcategory = category.target.value;
    }
    
  ngOnInit(): void {
    console.log("NGONINIT")

    this.userService.getAllUsers().subscribe((result) => {
      this.users = result['data'];
    })

    this.categoryService.showTicketCategories().subscribe((result) => {
      this.categors = result['data'];
      console.log(this.categors);
        })
  }

 
       
  close(){
    this.dialog.closeAll();
  }
}
