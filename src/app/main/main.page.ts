import { Component, OnInit } from '@angular/core';
import MemoryItem from '../models/memoryItem';
import MemoryService from '../services/memory.service';
import LoadingHelper from '../helpers/loading.helper';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  title: String = "Klory";
  memoryItems: Array<MemoryItem> = [];
  date: Date;
  filteredItems: Array<MemoryItem> = [];

  constructor(private readonly memoryService: MemoryService,
    private readonly loadingHelper: LoadingHelper,
    private readonly router: Router,
    private readonly route: ActivatedRoute) { }

  async ngOnInit() {
    this.route.params.subscribe(async () => {
      await this.updateMemoryItems(new Date());
    });
  }

  goToDetailsPage(id: string): void {
    this.router.navigate(['details', id]);
  }

  goToStatistics(): void {
    this.router.navigate(['statistics'], { state: { memoryItems: this.memoryItems, date: this.date } });
  }

  updateFilteredItems(value: string) {
    this.filteredItems = this.memoryItems.filter(m => {
      return m.foodName.toLowerCase().includes(value.toLowerCase());
    });
  }

  async updateMemoryItems(value: Date) {
    await this.loadingHelper.showLoading();

    const id = JSON.parse(localStorage.getItem("user")).id;
    this.date = new Date(value);

    const req = {
      userId: id,
      date: this.date
    };

    const res = await this.memoryService.getMemoryItemsFromDate(req);
    this.memoryItems = res.body;
    this.filteredItems = this.memoryItems;
    await this.waitForImages();
    await this.loadingHelper.dismiss();
  }

  async waitForImages(): Promise<any> {
    let proms = [];
    this.memoryItems.forEach(m => {
      m.foodName = this.updateFoodName(m.foodName);
      proms.push(this.createImagePromise(m.imageUrl));
    });

    return Promise.all(proms);
  }

  createImagePromise(url): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => { resolve() };
    });
  }

  updateFoodName(name: string): string {
    const toFilter = [{
      search: "%20",
      replacement: " "
    }];
    let auxName = name;
    
    toFilter.forEach(f => {
      auxName = auxName.split(f.search).join(f.replacement);
    });
    return this.capitalize(auxName);
  }

  capitalize(str: string) : string {
    str = str.toLocaleLowerCase();
    return str.charAt(0).toUpperCase() + str.substring(1);
  }
}
