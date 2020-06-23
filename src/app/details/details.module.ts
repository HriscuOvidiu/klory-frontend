import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPage } from './details.page';
import NutritionService from '../services/nutrition.service';
import MemoryService from '../services/memory.service';
import { MenuModule } from '../components/menu/menu.module';
import KloryHttpService from '../services/klory-http.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import LoadingHelper from '../helpers/loading.helper';
import { DetailsPageRoutingModule } from './details-routing.module';
import { InfoModule } from '../components/info/info.module';
import { TabsModule } from '../components/tabs/tabs.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule,
    MenuModule,
    HttpClientModule,
    InfoModule,
    TabsModule
  ],
  providers: [MemoryService, NutritionService, KloryHttpService, HttpClient, LoadingHelper],
  declarations: [DetailsPage]
})
export class DetailsPageModule {}
