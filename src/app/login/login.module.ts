import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import AuthService from '../services/auth.service';
import KloryHttpService from '../services/klory-http.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import ToastHelper from '../helpers/toast.helper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    HttpClientModule
  ],
  providers:[
    HttpClient,
    KloryHttpService,
    AuthService,
    ToastHelper
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
