import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Pager } from '../../entities/pager';
import { ContextService } from '../../services/context.service';
import { BaseComponent } from '../../shared/base/base.component';
import { PageAccessType } from '../../shared/enums';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent extends BaseComponent implements OnInit {
  private _pagination: Pager = new Pager();
  @Output() pager = new EventEmitter();
  @Input() _count;
  public firstPageVisibility: boolean = false;
  public lastPageVisibility: boolean = true;
  public totalPages: number=0;
  public currentPage: number = 1;
  constructor(
    protected _ctxService: ContextService,
    protected _router: Router

  ) {
    super(_ctxService, _router);
    this._pageAccessType = PageAccessType.PRIVATE;
  }

  ngOnInit() {
    console.log(this.totalPages)
  }

  ngOnChanges(changes: SimpleChanges): void {

    for (let property in changes) {
      if (property === '_count') {
        console.log("call",this._count,this._pagination)
        this.totalPages = Math.ceil(this._count / this._pagination.pageSize);
        this.validatePaginationControls();


      }
    }
  }

  validatePaginationControls() {
    console.log(this.totalPages, this.currentPage)
    if (this.currentPage == 1) {
      this.firstPageVisibility = false;
    }
    else {
      this.firstPageVisibility = true;

    }

    if (this.currentPage == this.totalPages) {
      this.lastPageVisibility = false;
    }
    else {
      this.lastPageVisibility = true;
    }

    if (this.totalPages >= 1 && this.totalPages <= this.currentPage) {
      this.lastPageVisibility = false;
    }
    else {
      this.lastPageVisibility = true;
    }

  }

  counter(i: number) {    
    return new Array(i);
  }
  
  onPageChange(currentPage: number) {
    this._pagination.pageIndex = currentPage;
    this.pager.emit({ pageIndex: this._pagination.pageIndex, pageSize: this._pagination.pageSize })
  }

  onchangePageIndex(currentPage) {
    console.log(currentPage,"current page")
    this.currentPage = Number(currentPage);
    this.validatePaginationControls();
    this._pagination.pageIndex = currentPage;
    this.pager.emit({ pageIndex: this._pagination.pageIndex, pageSize: this._pagination.pageSize })

  }

  onchangePageSize(pageSize) {
    this._pagination.pageSize = pageSize;
    this.totalPages = Math.ceil(this._count / this._pagination.pageSize);
    this._pagination.pageIndex = 1;
    this.currentPage = 1;
    this.validatePaginationControls();
    this.pager.emit({ pageIndex: this._pagination.pageIndex, pageSize: this._pagination.pageSize })
  }

  onchangePageForward() {
    this.firstPageVisibility = true
    this.currentPage = this.currentPage + 1;
    this.validatePaginationControls();
    this._pagination.pageIndex = this.currentPage;
    this.pager.emit({ pageIndex: this._pagination.pageIndex, pageSize: this._pagination.pageSize })
  }

  onchangePageBackword() {
    this.firstPageVisibility = true
    this.currentPage = this.currentPage - 1;
    this.validatePaginationControls();
    this._pagination.pageIndex = this.currentPage;
    this.pager.emit({ pageIndex: this._pagination.pageIndex, pageSize: this._pagination.pageSize })
  }

}
