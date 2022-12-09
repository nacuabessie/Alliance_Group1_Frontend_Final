import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { CategoryService } from 'src/app/service/category/category.service';
import { StatusService } from 'src/app/service/status/status.service';
import { TicketService } from 'src/app/service/ticket/ticket.service';
import { UsersService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-modal-view-tickets',
  providers: [ UsersService, CategoryService, StatusService],
  templateUrl: './modal-view-tickets.component.html',
  styleUrls: ['./modal-view-tickets.component.scss']
})
export class ModalViewTicketsComponent {
  @Input() viewedTicket: any;
  @Output() viewStatus = new EventEmitter<boolean>();

  constructor(
    private dialog: MatDialog,
    private toast: HotToastService,
    private ticketService: TicketService,
    private userService: UsersService,
    private categoryService: CategoryService,
    private statusService: StatusService,
    private fb: FormBuilder,
  ){}

  form = this.fb.group({
    ticketstatus:[''],
    ticketsubject:[''],
    ticketdescription:[''],
    ticketcategory:[''],
    ticketdeadline:[''],
    ticketassignee:[''],
    ticketfile:[''],
  })


  onClose(){
    this.viewStatus.emit(false);
  }


}
