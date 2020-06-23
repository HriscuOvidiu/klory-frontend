import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

Injectable()
export default class CameraHelper {

    constructor() {
    }

    async takePicture(): Promise<string> {
        const { Camera } = Plugins;
        const result = await Camera.getPhoto({ 
            quality: 75,
            allowEditing: false,
            source: CameraSource.Prompt,
            resultType: CameraResultType.Base64
        });

        return result.base64String;
    }
}