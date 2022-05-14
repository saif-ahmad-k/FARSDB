import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { BaseComponent } from '../base/base.component';
import { ContextService } from '../../services/context.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-base-popup',
    template: '',
})
export class BasePopupComponent  extends BaseComponent implements OnInit {

    constructor(
        protected _contextService: ContextService,
        protected _dialogRef: MatDialogRef<any>,
        protected _router: Router,
    ) { 
        super(_contextService,_router);
    }

    ngOnInit() {
    }

    // closeDialog ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    closeDialog() {
        this._dialogRef.close();
    }

}
