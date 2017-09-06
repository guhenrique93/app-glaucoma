import { EvaluationFR2Page } from './../evaluation-fr-02/evaluation-fr-02';
import { AuthService } from './../../providers/auth.service';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';


@Component({
  selector: 'page-evaluation',
  templateUrl: 'evaluation.html',
})
export class EvaluationPage {

  constructor(
    public authService: AuthService,
    public menuCtrl: MenuController,
    public navCtrl: NavController
  ) {}

  
  ionViewDidLoad() {
    this.menuCtrl.enable(true, 'user-menu');
  }

  ionViewCanEnter(): Promise<boolean> {
      return this.authService.authenticated;
  }

  evaluation() {
      this.navCtrl.push(EvaluationFR2Page);
  }
}
