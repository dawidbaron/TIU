import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { WindowsComponent } from './windows/windows.component';
import { TableComponent } from './table/table.component';
import { DetailsComponent } from './details/details.component';
import { UpdateComponent } from './update/update.component';
import { AddUserComponent } from './add-user/add-user.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { SearchNamePipe } from './SearchNamePipe';
import { SortByLastNamePipe } from './SortyByLastNamePipe';


@NgModule({
  declarations: [
    AppComponent,
    WindowsComponent,
    TableComponent,
    DetailsComponent,
    UpdateComponent,
    AddUserComponent,
    LoginComponent,
    WelcomeComponent,
    HeaderComponent,
    SearchNamePipe,
    SortByLastNamePipe
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
