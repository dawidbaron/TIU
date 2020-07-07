import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component'
import { LoginComponent } from './login/login.component';
import { UpdateComponent } from './update/update.component';
import { TableComponent } from './table/table.component';
import { WindowsComponent } from './windows/windows.component';
import { AddUserComponent } from './add-user/add-user.component';
import { DetailsComponent } from './details/details.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouteGuardUserService } from './service/route-guard-user.service.spec';
import { RouteGuardAdminService } from './service/route-guard-admin.service';

const appRoutes: Routes = [
  { path: 'login', component:  LoginComponent },
  { path: 'update/:id', component: UpdateComponent },
  { path: 'table', component: TableComponent, canActivate:[RouteGuardUserService]},
  { path: 'window', component: WindowsComponent , canActivate:[RouteGuardUserService]},
  { path: 'add', component: AddUserComponent , canActivate:[RouteGuardAdminService]},
  { path: 'more/:id', component: DetailsComponent , canActivate:[RouteGuardUserService]},
  { path: 'welcome', component:  WelcomeComponent , canActivate:[RouteGuardUserService]},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
