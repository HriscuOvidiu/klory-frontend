import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPageRoutingModule } from './add-routing.module';

import { AddPage } from './add.page';
import CameraHelper from '../helpers/camera.helper';
import { MenuModule } from '../components/menu/menu.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import KloryHttpService from '../services/klory-http.service';
import NutritionService from '../services/nutrition.service';
import { ModalComponent } from '../components/modal/modal.component';
import ToastHelper from '../helpers/toast.helper';
import PredictionService from '../services/prediction.service';
import LoadingHelper from '../helpers/loading.helper';
import { InfoModule } from '../components/info/info.module';
import { TabsModule } from '../components/tabs/tabs.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPageRoutingModule,
    MenuModule,
    HttpClientModule,
    InfoModule,
    TabsModule
  ],
  providers: [CameraHelper, NutritionService, KloryHttpService, HttpClient, ToastHelper, PredictionService, LoadingHelper],
  declarations: [AddPage, ModalComponent],
  entryComponents: [ModalComponent]
})
export class AddPageModule {}
