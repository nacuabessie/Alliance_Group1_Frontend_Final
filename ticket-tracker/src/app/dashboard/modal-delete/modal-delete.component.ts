import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TicketService } from 'src/app/service/ticket/ticket.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent {
  @Input() deletedTicket : any;
  @Output() deleteStatus = new EventEmitter<boolean>();

  constructor(
    private dialog: MatDialog,
    private tickets: TicketService,
  ){}
  
  ngOnInit(): void {
    console.log(this.deletedTicket);
  }
  
  onDelete(){
    this.tickets.deleteTicket(this.deletedTicket['id']);
    this.onClose()
  }

  onClose(){
    this.deleteStatus.emit(false);
  }
}
