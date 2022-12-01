import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup} from '@angular/forms';

@Component({
  selector: 'app-ticket-page',
  templateUrl: './ticket-page.component.html',
  styleUrls: ['./ticket-page.component.scss']
})
export class TicketPageComponent implements OnInit {
  formValue !: FormGroup;
  constructor(private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      ticketid: [''],
      assignee: [''],
      status: [''],
      subject: [''],
      tracker: [''],
      classtype: [''],
      description: [''],
    })
  }

  displayStyle = "none";
  displayEditStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
  
  openEditPopup() {
    this.displayEditStyle = "block";
  }
  closeEditPopup() {
    this.displayEditStyle = "none";
  }

}
