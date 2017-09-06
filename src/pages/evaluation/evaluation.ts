import { UserService } from './../../providers/user.service';
import { EvaluationFR2Page } from './../evaluation-fr-02/evaluation-fr-02';
import { AuthService } from './../../providers/auth.service';
import { Component, Input } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { User } from "../../models/user.model";


@Component({
  selector: 'page-evaluation',
  templateUrl: 'evaluation.html',
})
export class EvaluationPage {

    user: User;

  constructor(
    public authService: AuthService,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public userService: UserService
  ) {}

  
  ionViewDidLoad() {
    this.menuCtrl.enable(true, 'user-menu');
  }

  ionViewCanEnter(): Promise<boolean> {
       this.userService.currentUser
      .subscribe((user: User) => {
        this.user = user;
      })
      
      return this.authService.authenticated;      
  }

  evaluation() {
      this.navCtrl.push(EvaluationFR2Page);
  }
}
