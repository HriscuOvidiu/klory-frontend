import { Injectable } from '@angular/core';
import FoodItemDetails from '../models/foodItemDetails';
import KloryHttpService from './klory-http.service';

@Injectable()
export default class NutritionService{
    basePath = "nutrition/";
    
    constructor(private khttp: KloryHttpService){}

    getNutritionData(name: string): Promise<FoodItemDetails> {
        return this.khttp.get(this.basePath + name).toPromise();
    }

    getImageUrl(foodName: string): Promise<any> {
        const url = "image";
        const data = { keyword: foodName };
        return this.khttp.post(url, data).toPromise();
    }
}