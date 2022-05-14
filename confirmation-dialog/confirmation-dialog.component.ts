import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ContextService } from '../../services/context.service';
import { BasePopupComponent } from '../base-popup/base-popup.component';
import { PageAccessType } from '../enums';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent extends BasePopupComponent implements OnInit {
  // title: string;
  // message: string;

  constructor(
    protected _dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
    // public _dialog: MatDialog,
    protected _contextService: ContextService,
    protected _router: Router,

  ) {
    super(_contextService, _dialogRef,_router);
    this._pageAccessType = PageAccessType.PRIVATE;
   }
  

  ngOnInit() {
  }

}
