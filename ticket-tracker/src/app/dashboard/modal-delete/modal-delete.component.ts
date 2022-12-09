import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent {

  constructor(
    private dialog: MatDialog,
  ){}
  
  delete(){

  }
  
  close(){
    this.dialog.closeAll();
  }
}
