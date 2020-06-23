import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ToastHelper from '../helpers/toast.helper';
import { Config } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  title: String = "Klory";
  subtitle: String = "A calorie intake measuring tool";
  checked: boolean = false;

  constructor(private readonly router: Router,
              private readonly toastHelper: ToastHelper,
              private readonly config: Config) {}
  
  ngOnInit(): void {
    if(!!localStorage.getItem('user')) {
      this.router.navigate(['main']);
      this.toastHelper.showNormalToast("Logged in!");
    }

    this.checked = true;

    this.config.set('navAnimation', null);
    this.config.set('animated', false);
  }

  navigateTo(page:String) {
    this.router.navigate([page]);
  }
}
