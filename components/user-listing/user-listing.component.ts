import { copyStyles } from '@angular/animations/browser/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ChangeUserStatus } from '../../entities/changeUserStatus';
import { Pager } from '../../entities/pager';
import { ViewUserListing } from '../../entities/viewuserlisting';
import { ContextService } from '../../services/context.service';
import { UserService } from '../../services/user.service';
import { BaseComponent } from '../../shared/base/base.component';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { PageAccessType, Roles, SortDirection, SortFields, UserStatus } from '../../shared/enums';
declare var $: any;

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
})
export class UserListingComponent extends BaseComponent implements OnInit {
  public sortByField: typeof SortFields = SortFields;
  private _sortDirection: typeof SortDirection = SortDirection;
  public sortBy: number = this.sortByField.CreateStamp;
  public sortDirection: boolean = true;
  public listUsers: any = [];
  // _userStatus = UserStatus;
  public pagination: Pager = new Pager();
  public filterText: string = "";
  public isFilterInProgress: boolean = false;
  public count: number;
  private _status: ChangeUserStatus = new ChangeUserStatus();
  public currentUserId:number=this._contextService.CurrentUserId;
      public loading = false;
  constructor(
    protected _ctxService: ContextService,
    private _userService: UserService,
    private _dialog: MatDialog,
    protected _router: Router
  ) {
    super(_ctxService, _router);
    this._pageAccessType = PageAccessType.PRIVATE;
    this._pageAccessLevel.push(Roles.SuperAdmin, Roles.Admin);
    this.onClickSortBy(this.sortBy);
    this.getPageData();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  getPageData() {
    this.loading = true;
    this._userService.getAllUsers(this.pagination).subscribe((d: any) => {
      this.listUsers = d;
      this.count = this.listUsers.count;
      console.log(this.listUsers, "asd")
      this.isFilterInProgress = false;
      this.loading = false;

    });
  }

  onPageChange($event) {
    this.pagination.pageIndex = $event.pageIndex;
    this.pagination.pageSize = $event.pageSize
    this.getPageData();

  }
  onClickSortBy(sortBy: SortFields) {
    if (this.sortBy === sortBy) {
      this.sortDirection = !this.sortDirection;
    }
    else {
      this.sortDirection = true;
    }
    this.sortBy = sortBy;
    this.pagination.sortDirection = this.sortDirection ? this._sortDirection.Asc : this._sortDirection.Desc;
    this.pagination.sortBy = sortBy;
    this.pagination.pageIndex = 1;

    this.getPageData();
  }

  onClickCustomFilter(filterText: string) {
    this.pagination.filterText = filterText;
    this.pagination.pageIndex = 1;
    this.isFilterInProgress = true;

    this.getPageData();
  }

  clearCustomFilter() {
    this.pagination.pageIndex = 1;

    if (this.pagination.filterText) {
      this.filterText = '';
      this.pagination.filterText = '';
      this.isFilterInProgress = true;

      this.getPageData();
    }
    else {
      this.filterText = '';
    }
  }

  // onPageChange(currentPage) {
  //   this._pagination.pageIndex = currentPage;

  //   this.getPageData();
  // }

  onchangePageSize(pageSize) {
    this.pagination.pageSize = pageSize;
    this.pagination.pageIndex = 1;

    this.getPageData();
  }


  btnDeleteItem_Clicked(user: ViewUserListing) {

    if (user.id == this._contextService.CurrentUserId) {
      this.showMessage("User can't delete it's own account.", "warning");

    }
    else {
      const confirmDialog = this._dialog.open(ConfirmationDialogComponent, {
        width: '540px',
        height: '210px',
        data: {
          title: 'Confirm Delete User',
          message: 'Are you sure you want to delete user \"' + user.fullName + "\" " + "?"
        }
      });
      confirmDialog.afterClosed().subscribe(result => {
        if (result === true) {
          this._userService.deleteUser(user.id).subscribe((d: any) => {

            this.showMessage("User is deleted successfully.", "success");

            const indexs = this.listUsers.user.findIndex(d => d === user);

            this.listUsers.user.splice(indexs, 1);
            if (this.listUsers.user.length == 0) {
              if (this.pagination.pageIndex != 1) {
                this.pagination.pageIndex = this.pagination.pageIndex - 1;
              }
              this.getPageData();

            }
            else if(this.listUsers.user.length  <=  this.pagination.pageSize/2 && this.listUsers.count > this.listUsers.user.length ) {
              this.getPageData();
  
            }
          });
        }
      });
    }
  }

  restrictUserAccess(userId, event) {
    console.log(userId,event.target.checked)
    this._status.userId=userId;
    if (event.target.checked) {
      this._status.status = UserStatus.Active;
    }
    else {
      this._status.status = UserStatus.Locked;
    }
    this._userService.restrictUserAccess(this._status).subscribe((response: number) => {
      if(this._status.status == UserStatus.Locked)
      {
        this.showMessage("User is marked as Inactive successfully.", "success");
      }
      else if (this._status.status == UserStatus.Active)
      {
        this.showMessage("user is marked as Active successfully.", "success");
      }
    })
  }

 
}
