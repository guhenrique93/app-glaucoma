import { Evaluation } from './../../models/evaluation.model';
import { EvaluationService } from './../../providers/evaluation.service';
import { UserService } from './../../providers/user.service';
import { EvaluationFR2Page } from './../evaluation-fr-02/evaluation-fr-02';
import { AuthService } from './../../providers/auth.service';
import { Component, Input } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { User } from "../../models/user.model";
import firebase from "firebase";

@Component({
  selector: 'page-evaluation',
  templateUrl: 'evaluation.html',
})
export class EvaluationPage {

    user: User;

  constructor(
    public authService: AuthService,
    public evaluationSevice: EvaluationService,
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

  startEvaluation() {
        this.evaluationSevice.evaluationStartedNotFinished(this.user.uid)
          .first()
          .subscribe((evaluationNotFinished: boolean) => {
              if (!evaluationNotFinished){
                this.newEvaluation();
              }
              else
              {
                console.log("Existe uma avaliação já iniciada!");
              }
              
              let evaluation = this.evaluationSevice.getCurrentEvaluation(this.user.uid);

              console.log(evaluation);

              this.navCtrl.push(EvaluationFR2Page, {evaluation: evaluation});        
          });
  }

    private newEvaluation() {
        let timestamp: Object = firebase.database.ServerValue.TIMESTAMP; //Date.now();
        let evaluation = new Evaluation(timestamp, false);
        this.evaluationSevice.create(evaluation, this.user.uid);
    }
}
