import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Helper } from '../../helpers/helper';
import { ContextService } from '../../services/context.service';
import { BaseComponent } from '../base/base.component';
import { Pages, Roles, SideMenu } from '../enums';

@Component({
  selector: 'app-public-panel',
  templateUrl: './public-panel.component.html',
})
export class PublicPanelComponent extends BaseComponent implements OnInit {
  @Input() CurrentPage: Pages;
  private _menuItemsVisibility = Helper.menuItemsDisplay;
  private _role = Roles;
  public get sideMenu(): typeof SideMenu {
    return SideMenu;
  }
  constructor(
    protected _contextService: ContextService,
    private _avRoute: ActivatedRoute,
    protected _router: Router

  ) {
    super(_contextService, _router);
    this.CurrentPage = Pages.None;

  }
  checkUserRole(sideMenu: SideMenu) {
    switch (sideMenu) {
     

      case SideMenu.Admin: {
        var roleCheck = this._contextService._userRoles.rolesId  == Roles.Admin || this._contextService._userRoles.rolesId== Roles.SuperAdmin;
        if (roleCheck) {
          return true;
        }
        else {
          return false;
        }
      }
      case SideMenu.Tenants:
        {
          var roleCheck = this._contextService._userRoles.rolesId  == Roles.Admin || this._contextService._userRoles.rolesId == Roles.SuperAdmin || this._contextService._userRoles.rolesId == Roles.Commercial  || this._contextService._userRoles.rolesId == Roles.Private;
          if (roleCheck) {
            return true;
          }
          else {
            return false;
          }
        }
      case SideMenu.Users: {
        var roleCheck = this._contextService._userRoles.rolesId  == Roles.Admin || this._contextService._userRoles.rolesId == Roles.SuperAdmin;
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
  checkRole(role: Roles) {

    var roleCheck = this._contextService._userRoles.find(item => item.rolesId == role);
    if (roleCheck) {
      return true;
    }
    else {
      return false;
    }
  }
  ngOnInit() {
  
  }
  redirectTo(uri: string) {
    console.log(uri)
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this._router.navigate([uri]));
  }

  superAdminRedirectTo(uri: string) {
    uri = `sa/${uri}`
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this._router.navigate([uri]));
  }


}
