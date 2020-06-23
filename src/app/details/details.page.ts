import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import MemoryItem from '../models/memoryItem';
import MemoryService from '../services/memory.service';
import NutritionService from '../services/nutrition.service';
import LoadingHelper from '../helpers/loading.helper';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  title: string;
  memoryItem: MemoryItem;
  foodItemDetails: any = {};
  imageUrl: string;
  getMemoryItem$: Observable<MemoryItem>;

  objectKeys = Object.keys

  constructor(private activeRoute: ActivatedRoute,
              private memoryService: MemoryService,
              private nutritionService:NutritionService,
              private loadingHelper: LoadingHelper) { }

  ngOnInit() {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.loadingHelper.showLoading();
    this.getMemoryItem$ = this.memoryService.getMemoryItem(id);
    this.getMemoryItem$.subscribe(async (mi) => {
      this.memoryItem = mi;
      this.title = this.memoryItem.foodName;
      this.imageUrl = this.memoryItem.imageUrl;

      this.foodItemDetails = await this.nutritionService.getNutritionData(mi.foodName);

      delete this.foodItemDetails['id'];
      delete this.foodItemDetails['foodName'];

      Object.keys(this.foodItemDetails).forEach(k => {
        this.foodItemDetails[k] = this.memoryItem.amount / 100 * this.foodItemDetails[k];
      });
      this.loadingHelper.dismiss();
    });
  }

  capitalize(str: string) : string {
    str = str.toLocaleLowerCase();
    return str.charAt(0).toUpperCase() + str.substring(1);
  }
}
