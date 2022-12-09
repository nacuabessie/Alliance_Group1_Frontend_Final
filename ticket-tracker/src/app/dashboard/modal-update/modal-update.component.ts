import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { CategoryService } from 'src/app/service/category/category.service';
import { StatusService } from 'src/app/service/status/status.service';
import { TicketService } from 'src/app/service/ticket/ticket.service';
import { UsersService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-modal-update',
  providers: [ UsersService, CategoryService, StatusService ],
  templateUrl: './modal-update.component.html',
  styleUrls: ['./modal-update.component.scss']
})
export class ModalUpdateComponent {
  @Input() updatedTicket : any;
  @Output() updateStatus = new EventEmitter<boolean>();

  constructor(
    private dialog: MatDialog,
    private toast: HotToastService,
    private HttpClient: HttpClient,
    private ticketService: TicketService,
    private userService: UsersService,
    private categoryService: CategoryService,
    private statusService: StatusService,
    private fb: FormBuilder,
  ){}

  users: any[] = [];
  categors: any[] = [];
  statuses: any[] =[];

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

  onUpdateTicket(){
    let formData: FormData = new FormData();

    formData.append('id', this.updatedTicket['id'])
    formData.append('assignee', this.selectedassignee);
    formData.append('status', this.selectedstatus);
    formData.append('subject', this.f.ticketsubject.value!);
    formData.append('category', this.selectedcategory);
    formData.append('description', this.f.ticketdescription.value!);
    formData.append('deadline', this.f.ticketdeadline.value!);
    formData.append('document_Path', this.f.ticketfile.value!);
    formData.append('sender', '1');

    this.ticketService.updateTicket(formData).subscribe(()=>{});
    location.reload();
    this.onClose()

  }

  selectedassignee: string='';
  selectedcategory: string='';
  selectedstatus: string='';

  chooseAssignee(assignee: any){
    this.selectedassignee = assignee.target.value;
  }

  chooseCategory(category: any){
    this.selectedcategory = category.target.value;
  }

  chooseStatus(status: any){
    this.selectedstatus = status.target.value;
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
    
    this.statusService.showStatuses().subscribe((result) => {
      this.statuses = result['data'];
      console.log(this.statuses);
    })
  }

  onClose(){
    this.updateStatus.emit(false);
  }
}
