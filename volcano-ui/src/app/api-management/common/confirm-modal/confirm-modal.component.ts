import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

export interface ConfirmModel {
  title: string;
  message: string;
}
@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent extends DialogComponent<ConfirmModel, boolean> {

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  onConfirm() {
    this.result = true;
    this.close();
  }
}
