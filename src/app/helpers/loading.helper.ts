import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export default class LoadingHelper {

    private readonly loadingText = "Please wait...";
    private loadingView: HTMLIonLoadingElement;

    constructor(private loadingController: LoadingController) {
    }

    async showLoading() {
        if (!this.loadingView) {
            this.loadingView = await this.loadingController.create({
                message: this.loadingText
            });
    
            await this.loadingView.present();
        }
    }

    async dismiss() {
        if (this.loadingView) {
            await this.loadingView.dismiss();
            this.loadingView = null;
        }
    }
}