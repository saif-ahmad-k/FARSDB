import { NgModule } from '@angular/core';
import { BrowserModule, ɵDomSanitizerImpl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './shared/app-header/app-header.component';

import { ContextService } from './services/context.service';
import { UserService } from './services/user.service';

import { BaseComponent } from './shared/base/base.component';
import { BasePopupComponent } from './shared/base-popup/base-popup.component';
import { LoginComponent } from './components/login/login.component';
import { DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { ReactiveFormsModule } from "@angular/forms";
import { SafePipe } from './pipes/safe.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ImageCropperModule } from 'ngx-img-cropper';
import { LowerCaseUrlSerializer } from './helpers/LowerCaseUrlSerializer';
import { PublicPanelComponent } from './shared/public-panel/public-panel.component';
import { EnumToArrayPipe } from './pipes/enumToArray';
import { MatDialogModule, MatInputModule, MatSelectModule } from '@angular/material';
import { DatePipe } from '@angular/common';
import { CookieModule, CookieService } from 'ngx-cookie';
import { UserListingComponent } from './components/user-listing/user-listing.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { ChartsModule } from 'ng2-charts';
import { PaginationComponent } from './components/pagination/pagination.component';
import { AuthGuard } from './services/authguard';
import { MatIconModule } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
    imports: [
        BrowserModule,
        DragDropModule,
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        ImageCropperModule,
        MatDialogModule,
        CookieModule.forRoot(),
        NgxPaginationModule,
        ChartsModule,
        DragDropModule,
        MatSelectModule,
        MatIconModule,
        MatTabsModule,
        MatInputModule,
        NgxLoadingModule.forRoot({})


    ],
    declarations: [
        AppComponent,
        AppHeaderComponent,
        BaseComponent,
        BasePopupComponent,
        LoginComponent,
        SafePipe,
        PublicPanelComponent,
        EnumToArrayPipe,
        UserListingComponent,
        ConfirmationDialogComponent,
        PaginationComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: UrlSerializer, useClass: LowerCaseUrlSerializer },
        ContextService,
        UserService,
        ɵDomSanitizerImpl,
        DatePipe,
        CookieService,
        AuthGuard
    ],
    entryComponents: [
        ConfirmationDialogComponent,
     
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
