import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import MemoryService from '../services/memory.service';
import { MenuModule } from '../components/menu/menu.module';
import { MainPage } from './main.page';
import KloryHttpService from '../services/klory-http.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import LoadingHelper from '../helpers/loading.helper';
import { TabsModule } from '../components/tabs/tabs.module';
import ToastHelper from '../helpers/toast.helper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    MenuModule,
    HttpClientModule,
    TabsModule,
    MenuModule
  ],
  providers: [MemoryService, KloryHttpService, HttpClient, LoadingHelper, ToastHelper],
  declarations: [MainPage]
})
export class MainPageModule {}
