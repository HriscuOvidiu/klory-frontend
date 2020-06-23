import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';

import AuthService from '../services/auth.service';
import KloryHttpService from '../services/klory-http.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import ToastHelper from '../helpers/toast.helper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    KloryHttpService,
    HttpClient,
    ToastHelper
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
