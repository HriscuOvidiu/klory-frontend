import { Component, OnInit } from '@angular/core';
import { Config } from '@ionic/angular';
import AuthService from '../services/auth.service';
import ToastHelper from '../helpers/toast.helper';
import { Router } from '@angular/router';
import LoadingHelper from '../helpers/loading.helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  title: String = "Login";

  username: string;
  password: string;

  ngOnInit() { 
    this.config.set('navAnimation', null);
    this.config.set('animated', false);   
  }

  constructor(private readonly router: Router,
              private readonly authService: AuthService,
              private readonly toastHelper: ToastHelper,
              private readonly config: Config,
              private readonly loadingHelper: LoadingHelper) { }

  async login() {
    const data = {
      username: this.username,
      password: this.password
    }

    try { 
      this.loadingHelper.showLoading();
      const res = await this.authService.login(data);
      this.loadingHelper.dismiss();
      this.toastHelper.showNormalToast("Successfully logged in!");
      localStorage.setItem('user', JSON.stringify(res.body));
      this.router.navigate(['main']);
    } catch {
      this.toastHelper.showErrorToast("Username and/or password are incorrect");
    }
  }

  register() {
    this.router.navigate(['register']);
  }
}
