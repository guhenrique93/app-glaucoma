import { EvaluationPage } from './../evaluation/evaluation';
import { AuthService } from './../../providers/auth.service';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public authService: AuthService,
    public menuCtrl: MenuController,
    public navCtrl: NavController
  ) {

  }

  evaluation()
  {
    this.navCtrl.push(EvaluationPage);
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true, 'user-menu');
  }

  ionViewCanEnter(): Promise<boolean> {
      return this.authService.authenticated;
  }
}
