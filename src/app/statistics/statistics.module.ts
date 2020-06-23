import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatisticsPageRoutingModule } from './statistics-routing.module';

import { StatisticsPage } from './statistics.page';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import NutritionService from '../services/nutrition.service';
import ToastHelper from '../helpers/toast.helper';
import LoadingHelper from '../helpers/loading.helper';
import KloryHttpService from '../services/klory-http.service';
import { TabsModule } from '../components/tabs/tabs.module';
import { MenuModule } from '../components/menu/menu.module';
import { InfoModule } from '../components/info/info.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatisticsPageRoutingModule,
    HttpClientModule,
    TabsModule,
    MenuModule,
    InfoModule
  ],
  declarations: [StatisticsPage],
  providers: [ToastHelper, NutritionService, HttpClient, LoadingHelper, KloryHttpService]
})
export class StatisticsPageModule {}
