
import { Component, OnInit } from '@angular/core';
import { isDevMode } from '@angular/core';

import { ContextService } from './services/context.service';
import { BaseComponent } from './shared/base/base.component';
import { HomeService } from './services/home.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent implements OnInit {
    public showLeftMenue: Boolean = true;
    public isDevMode: boolean = true;

    constructor(
        protected _contextService: ContextService,
        private _homeService: HomeService,
        protected _router: Router
        ) {
        super(_contextService,_router);

        this.isDevMode = isDevMode();
    }

    ngOnInit() {
        this._contextService.service_OnInit();
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.loadApplicationCache();
        }, 0);
    }

    //// loadApplicationCache /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async loadApplicationCache() {
        console.log('app cache...');

    }
}

