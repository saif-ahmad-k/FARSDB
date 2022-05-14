import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserListingComponent } from './components/user-listing/user-listing.component';
import { AuthGuard } from './services/authguard';

const routes: Routes = [

    { path: 'login', component: LoginComponent },
     { path: '', pathMatch: 'full', component: UserListingComponent },
    { path: 'users', pathMatch: 'full', component: UserListingComponent,canActivate: [AuthGuard] },
{ path: '**', component: UserListingComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
