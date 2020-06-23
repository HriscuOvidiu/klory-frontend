import { Component, OnInit } from '@angular/core';
import AuthService from '../services/auth.service';
import ToastHelper from '../helpers/toast.helper';
import { Router } from '@angular/router';
import { Config } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  title: String = "Register";
  username: string;
  password: string;
  email: string;

  constructor(private readonly router: Router,
              private readonly authService: AuthService,
              private readonly toastHelper: ToastHelper,
              private readonly config: Config) { }

  ngOnInit() {
    this.config.set('navAnimation', null);
    this.config.set('animated', false);

    document.addEventListener('ionBackButton', (e) => {
      this.router.navigate(['/registerhome']);
    });
    
    if(!!localStorage.getItem('user')) {
      this.router.navigate(['/main']);
      this.toastHelper.showNormalToast("Already logged in!");
    }
  }

  async register() {
    const data = {
      username: this.username,
      password: this.password,
      email: this.email
    }
    try { 
      const res = await this.authService.register(data);

      this.toastHelper.showNormalToast('Successfully registered!')
      this.router.navigate(['login']);
    } catch {
      this.toastHelper.showErrorToast('Error while registering!');
    }
  }
}
