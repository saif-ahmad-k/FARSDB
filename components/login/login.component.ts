import { Component, Inject, OnInit } from '@angular/core';
import { ContextService } from '../../services/context.service';
import { UserService } from '../../services/user.service';
import { User } from '../../entities/user';
import { BaseComponent } from '../../shared/base/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Helper } from '../../helpers/helper';
import { Validators, FormBuilder } from '@angular/forms';
import { Settings } from '../../helpers/settings';
import { CookieService } from 'ngx-cookie';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

declare var window: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent extends BaseComponent implements OnInit {
    public submitted = false;
    public isLoginInProgress: boolean = false;
    private _returnUrl: string;
    private _currentYear;

    public loginForm = this._formBuilder.group({
        emailAddress: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        rememberMe: [false]
    });
     private _now = new Date();
    private _exp =  new Date(this._now.getFullYear()+1, this._now.getMonth(), this._now.getDate());
    constructor(
        protected _contextService: ContextService,
        private _userService: UserService,
        protected _router: Router,
        private _formBuilder: FormBuilder,
        private _cookieService: CookieService,
        protected _route: ActivatedRoute,
        private _dialog: MatDialog,


    ) {
        super(_contextService,_router);
        this._currentYear = Settings.currentYear;
        if(this._cookieService.get('emailAddress'))
        {
        this.loginForm.patchValue({
            emailAddress: this._cookieService.get('emailAddress'),
            rememberMe: this._cookieService.get('remember')
        });
        }
    }

    ngOnInit() {
        this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    }

    get myLoginForm() {
        return this.loginForm.controls;
    }

    btnLogin_Clicked() {
        console.log('logging in...');

        this.submitted = true;
        if (!this.loginForm.valid) {
            return false;
        } else {

            var user = new User({ email: this.loginForm.value.emailAddress.trim(), password: this.loginForm.value.password.trim() });
            this.isLoginInProgress = true;

            this._userService.authenticate(user).subscribe(d => {
                this.isLoginInProgress = false;
                localStorage["app"] = d.jwt;
                localStorage["role"] =JSON.stringify( d.role);
                this._contextService._token = d.jwt;
                this._contextService._session = window.parseJwt(d.jwt);
                this._contextService._userRoles = d.role;
                if (this.loginForm.value.rememberMe) {
                    this._cookieService.put('emailAddress', this.loginForm.value.emailAddress,{  expires: this._exp});
                    this._cookieService.put('remember', this.loginForm.value.rememberMe,{  expires: this._exp});

                }
                else {
                    this._cookieService.remove('emailAddress'),
                    this._cookieService.remove('remember')
                }
               console.log(this._returnUrl)
                this._router.navigate([this._returnUrl]);
                // this.router.navigate(['/users']);

            }, err => {
                this.isLoginInProgress = false;
                switch (err.status) {
                    case 401:
                        this.showMessage("Invalid user name or password.", "error");
                        break;
                    default:
                        this.showMessage("Something went wrong, please try again.", "error");
                        break;
                }
            });
        }
    }

}
