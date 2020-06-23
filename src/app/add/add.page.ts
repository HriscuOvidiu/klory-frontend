import { Component, OnInit } from '@angular/core';
import CameraHelper from '../helpers/camera.helper';
import { ModalController, AlertController } from '@ionic/angular';
import { ModalComponent } from '../components/modal/modal.component';
import NutritionService from '../services/nutrition.service';
import PredictionService from '../services/prediction.service';
import ToastHelper from '../helpers/toast.helper';
import LoadingHelper from '../helpers/loading.helper';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage {

  foodName: string;

  constructor(private cameraHelper: CameraHelper,
    private toastHelper: ToastHelper,
    private modalController: ModalController,
    private nutritionService: NutritionService,
    private alertController: AlertController,
    private predictionService: PredictionService,
    private loadingHelper: LoadingHelper) { }

  async showDetails(foodName, image) {
    try {
      await this.loadingHelper.showLoading();
      if (!foodName) {
        foodName = this.foodName;
      }
      const foodData = await this.nutritionService.getNutritionData(foodName);

      if (!image) {
        const imageRes = await this.nutritionService.getImageUrl(foodName);
        image = imageRes.body.url;
      }
      await this.loadingHelper.dismiss();
      this.showModal(foodData, image);
    } catch {
      const alert = await this.alertController.create({
        header: "Error",
        subHeader: "Food Not found",
        message: "We're sorry but we couldn't find the food item you requested. Try with a different one instead!"
      });
      await this.loadingHelper.dismiss();
      alert.present();
    }
  }

  async takePicture() {
    const picture = await this.cameraHelper.takePicture();

    await this.loadingHelper.showLoading();
    try {
      const uploadResult = await this.predictionService.upload(picture);
      const image = uploadResult.body.key;
      const imageUrl = uploadResult.body.fullUrl;
      const res = await this.predictionService.predict(image);
      const prediction = res.body.foodItem.split('_').join(" ");
      await this.loadingHelper.dismiss();

      const alert = await this.alertController.create({
        header: "Question",
        message: "Food item predicted: " + prediction + "Is this ok?",
        buttons: [
          {
            text: "Yes",
            role: "yes"
          },
          {
            text: "No",
            role: "no"
          }
        ]
      });

      alert.onDidDismiss().then(async (e) => {
        if (e.role === "yes") {
          await this.showDetails(prediction, imageUrl);
        }
      });

      await alert.present();
    } catch {
      await this.loadingHelper.dismiss();
      this.toastHelper.showErrorToast();
    }
  }

  async showModal(foodData, image) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {
        foodData: foodData,
        imageUrl: image
      }
    });

    modal.present();
  }
}
