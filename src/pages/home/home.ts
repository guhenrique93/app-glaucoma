import { EvaluationPage } from './../evaluation/evaluation';
import { AuthService } from './../../providers/auth.service';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { RiskExibitionPage } from '../risk-exibition/risk-exibition';
import { UserService } from '../../providers/user.service';
import { User } from '../../models/user.model';
import { Evaluation } from '../../models/evaluation.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: User;
  
  constructor(
    public authService: AuthService,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public userService: UserService    
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
    this.userService.currentUser
      .subscribe((user: User) => {
        this.user = user;
      });

    return this.authService.authenticated;
  }

  calcularRisco() {

    alert("Calculando risco... (é só um teste)");

    //this.goHome();

    this.navCtrl.push(RiskExibitionPage, {evaluation: this.newEvaluation()});
  }

  private newEvaluation(): Evaluation {
    let evaluation = new Evaluation(null, false);
    evaluation.userId = this.user.uid;

    return evaluation;
}
}
