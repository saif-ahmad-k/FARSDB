import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Observable } from 'rxjs/internal/Observable';
import { SideMenu } from '../shared/enums';

export class Helper {
    constructor(private _http: HttpClient) { }
    static _seoString;
    public date = new Date();
    public static menuItemsDisplay = [
        {
            name: SideMenu.Users,
            show: false
        },
        {
            name: SideMenu.Dashboard,
            show: false
        },
        {
            name: SideMenu.Tenants,
            show: false
        },
        {
            name: SideMenu.Admin,
            show: false
        },

        {
            name: SideMenu.Users,
            show: false
        },
       

    ];
    // calculateAge /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static calculateAge(birthDate: Date, currentDate: Date): string {
        var today = currentDate;
        var birthDate = new Date(birthDate);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age.toString();
    }

    // base64ToArrayBuffer /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static base64ToArrayBuffer(base64): any {
        var binaryString = window.atob(base64);
        var len = binaryString.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }

    // parseJwt /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    static parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    };

    // custom validator to check that two fields match
    static MustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                // return if another validator has already found an error on the matchingControl
                return;
            }

            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }
     // custom validator to check that two fields match
     static CompareDate(startDate: string, endDate: string) {
        return (formGroup: FormGroup) => {
            const start = formGroup.controls[startDate];
            const end = formGroup.controls[endDate];

            if (end.errors && !end.errors.isLater) {
                // return if another validator has already found an error on the matchingControl
                return;
            }
            // set error on matchingControl if validation fails
            if (start.value >= end.value) {
                end.setErrors({ isLater: true });
            } else {
                end.setErrors(null);
            }
        }
    }
}