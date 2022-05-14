
import { Component } from '@angular/core';
import { PageAccessType, Roles, SideMenu } from '../enums';
import { ContextService } from '../../services/context.service';
import { Router } from '@angular/router';
declare var window: any;
declare var jquery: any;
declare var $: any;

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.css']
})
export class BaseComponent {
    protected _pageAccessType: PageAccessType = PageAccessType.PUBLIC;
    protected _pageAccessLevel :Roles[]=[];
    protected _contextService: ContextService;
    protected _router: Router;
    constructor(protected contextService: ContextService,protected router: Router ) {
        this._contextService = contextService;
        this._router = router;
    }

    ngOnInit() {
        this.validateUserSession();

        this.main_documentReady();
    }

    main_documentReady() {
    }

    setPageTitle(title: string) {
        window.document.title = title;
    }

    validateUserSession() {
        if (this._pageAccessType == PageAccessType.PUBLIC)
            return;

        console.log('validating session...');

        if (!this._contextService._session || !localStorage["app"]) {
            this._contextService.logout();
            return;
        }
        console.log(this.contextService._userRoles,"user roles")
        console.log(this.contextService._userRoles,this.contextService._userRoles.rolesId)
        let roleCheck = this.contextService._userRoles.rolesId;
        if(roleCheck.length ==0)
        {
        this._router.navigate(['/users'])
        }
        //// check token expiry
        var currentTime = new Date().getTime() / 1000;
        if (parseInt(this._contextService._session.exp) < currentTime) {
            this._contextService.logout();
        }
    }

    showMessage(message: string, type: string) {
        window.showMessage(message, type);
    }
   

    openPopup(url: string) {
        window.openPopup(url);
    }

    getElementById(id: string) {
        return $(window.document.getElementById(id));
    }

    removeDom(obj) {
        return window.removeDom(obj);
    }

    trackByFunction(index, item) {
        console.log(item.id)
        return item.id;
     }

     redirectTo(uri: string) {
        this._router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this._router.navigate([uri]));
      }
    
      superAdminRedirectTo(uri: string) {
        uri = `sa/${uri}`
        this._router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this._router.navigate([uri]));
      }

      checkUserRole(sideMenu: SideMenu) {
        switch (sideMenu) {
            case SideMenu.SuperAdmin: {
                var roleCheck = this.contextService._userRoles  == Roles.SuperAdmin;
                if (roleCheck) {
                  return true;
                }
                else {
                  return false;
                }
              }
          case SideMenu.Admin: {
              console.log(this._contextService._userRoles)
            var roleCheck = this.contextService._userRoles == Roles.Admin;
            if (roleCheck) {
              return true;
            }
            else {
              return false;
            }
          }
          case SideMenu.Users: {
            var roleCheck = this.contextService._userRoles  == Roles.SuperAdmin;
            if (roleCheck) {
              return true;
            }
            else {
              return false;
            }
          }
          default: {
            break;
          }
        }
      }

}
