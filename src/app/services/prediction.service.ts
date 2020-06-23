import { Injectable } from '@angular/core';
import KloryHttpService from './klory-http.service';

@Injectable()
export default class PredictionService {

    basePath = "prediction/";

    constructor(private khttp: KloryHttpService){}

    predict(key): Promise<any> {
        return this.khttp.post(this.basePath, { key: key }).toPromise();
    }

    upload(image): Promise<any> {
        const path = "upload/";
        return this.khttp.post(path, { image: image }).toPromise();
    }
}