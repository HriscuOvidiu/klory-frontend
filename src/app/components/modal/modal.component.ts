import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController, NavController } from '@ionic/angular';
import MemoryService from 'src/app/services/memory.service';
import ToastHelper from 'src/app/helpers/toast.helper';
import LoadingHelper from 'src/app/helpers/loading.helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  foodData: any;
  foodName: string;
  imageUrl: string;
  objectKeys = Object.keys;
  loading: boolean = true;

  constructor(private readonly modalController: ModalController,
              private readonly alertController: AlertController,
              private readonly toastHelper: ToastHelper,
              private readonly router: Router,
              private readonly loadingHelper: LoadingHelper,
              private readonly navParams: NavParams,
              private readonly memoryService: MemoryService) { 
              }

  ngOnInit() {
    this.foodData = this.navParams.get('foodData');
    this.imageUrl = this.navParams.get('imageUrl');
    this.foodName = this.foodData.foodName;
    delete this.foodData['foodName'];

    const img = new Image();
    img.src = this.imageUrl;
    this.loadingHelper.showLoading();
    img.onload = () => { this.loadingHelper.dismiss(); this.loading = false; };
  }

  close(): void {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  async onAdd() {
    const alert = await this.alertController.create({
      header: "Please enter the amount (in g)",
      inputs: [
        { 
          name: "amount",
          type: "text",
          placeholder: "Amount"
        }
      ],
      buttons: [
        { 
          text: "Add",
          role: "ok"
        },
        { 
          text: "Cancel",
          role: "cancel"
        }
      ]
    });

    alert.onDidDismiss().then(async (e) => {
      if(e.role === "ok") {
        await this.addItem(e.data.values.amount);
      }
    });

    await alert.present();
  }

  async addItem(amount) {
    const id = JSON.parse(localStorage.getItem("user")).id;
    const memoryItem = {
      amount: parseInt(amount),
      foodName: this.foodName,
      userId: id,
      date: new Date(),
      imageUrl: this.imageUrl
    };

    try{ 
      await this.memoryService.addMemoryItem(id, memoryItem);
      this.close();
      this.toastHelper.showNormalToast("Added a new food item!");
      this.router.navigate(['main']);
    } catch {
      this.toastHelper.showErrorToast("There was an error. Please try again!");
    }
  }
}
