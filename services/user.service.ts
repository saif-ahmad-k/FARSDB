import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../entities/user';
import { Settings } from '../helpers/settings';
import { ViewUserListing } from '../entities/viewuserlisting';
import { Pager } from '../entities/pager';
import { ChangePassword } from '../entities/changePassword';
import { ChangeUserStatus } from '../entities/changeUserStatus';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private _http: HttpClient
    ) {
    }

    authenticate(user: User): Observable<any> {
        return this._http.post<User>(`${Settings.apiBase}users/auth`, user);
    }

    getUserById(id: number): Observable<User> {
        return this._http.get<any>(`${Settings.apiBase}users/${id}`);
    }

    getAllUsers(pagination:Pager): Observable<ViewUserListing> {
        console.log(pagination)
        return this._http.post<any>(`${Settings.apiBase}users`,pagination);
    }

    deleteUser(userId: number): Observable<number> {
        return this._http.delete<number>(`${Settings.apiBase}users/${userId}`)

    }

    updatePassword(password: ChangePassword): Observable<number> {
        console.log(password)
        return this._http.put<any>(`${Settings.apiBase}users/changepassword`,password);
    }

    restrictUserAccess(status: ChangeUserStatus): Observable<number> {
        console.log(status)
        return this._http.put<any>(`${Settings.apiBase}users/restrictuseraccess`,status);
    }

    insertUser(user: any): Observable<number> {
        console.log(user)
        return this._http.post<number>(`${Settings.apiBase}users/register`, user)
    }
    
}
