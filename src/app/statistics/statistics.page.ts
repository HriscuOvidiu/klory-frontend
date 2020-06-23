import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import MemoryItem from '../models/memoryItem';
import { Chart } from 'node_modules/chart.js';
import NutritionService from '../services/nutrition.service';
import ToastHelper from '../helpers/toast.helper';
import LoadingHelper from '../helpers/loading.helper';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {

  memoryItems: Array<MemoryItem>;
  nutritionData: any;
  date: string;

  constructor(private readonly router: Router,
              private readonly nutritionService: NutritionService,
              private readonly toastHelper: ToastHelper,
              private readonly loadingHelper: LoadingHelper) {
    this.memoryItems = router.getCurrentNavigation().extras.state.memoryItems;
    this.date = this.buildDate(router.getCurrentNavigation().extras.state.date);
  }

  async ngOnInit() {
    const data = this.generateDataMap(this.memoryItems);
    this.nutritionData = await this.getNutritionData(data);
    this.buildBarplot(this.nutritionData);
  }

  private generateDataMap(memoryItems: Array<MemoryItem>) {
    const dataMap = {};

    memoryItems.forEach(item => {
      const f = item.foodName;
      if (dataMap[f]) {
        dataMap[f] += item.amount;
      } else {
        dataMap[f] = item.amount;
      }
    });

    return dataMap;
  }

  private buildDate(date: Date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return date.toLocaleDateString("en-US", options)
  }

  private async getNutritionData(data) {
    const nutritionData: any = {};
    await this.loadingHelper.showLoading();

    try {
      for (const key of Object.keys(data)) {
        const res = await this.nutritionService.getNutritionData(key);
        for (const k of Object.keys(res)) {
          if (nutritionData[k]) {
            nutritionData[k] += res[k] * data[key] / 100;
          } else {
            nutritionData[k] = res[k] * data[key] / 100;
          }
        }
      }
    } catch(e) {
      this.toastHelper.showErrorToast("Error while getting statistics. Please try again later.");
      await this.loadingHelper.dismiss();
      this.router.navigate(['main']);
    }

    await this.loadingHelper.dismiss();
    delete nutritionData["foodName"];
    return nutritionData;
  }  

  private buildBarplot(nutritionData) {
    const colors = [];
    Object.keys(nutritionData).forEach(() => {
      const color = '#'+Math.floor(Math.random()*16777215).toString(16);
      colors.push(color);
    });
    const ctx = (<HTMLCanvasElement>document.getElementById('myChart')).getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(nutritionData),
        datasets: [
          {
            label: "Amount Consumed",
            data: Object.values(nutritionData),
            backgroundColor: colors,
            borderWidth: 1
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
