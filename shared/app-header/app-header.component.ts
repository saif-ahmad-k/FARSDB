import { Component, OnInit } from '@angular/core';
import { ContextService } from '../../services/context.service';
import { BaseComponent } from '../base/base.component';
import { Router } from '@angular/router';
import { Roles } from '../enums';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
})
export class AppHeaderComponent extends BaseComponent implements OnInit {
    protected _saRole :Roles;
    darkTheme =  new FormControl(false);
    // public _isSA : boolean =false;

    constructor(
       protected _contextService: ContextService,
       protected _router: Router,
        ) { 
        super(_contextService,_router)
        this._saRole = Roles.SuperAdmin;
    }

    ngOnInit() {
        // this.checkUserRoles();
    }

    btnLogout_Clicked()
    {
        this._contextService.logout();
    }
    
    // checkUserRoles()
    // {

    //     let roleCheck = this._contextService._userRoles.filter(item => item.roleId == this._saRole);
    //     if(roleCheck.length > 0)
    //     {
    //         this._isSA =true;
            
    //     }


    // }
    
}
