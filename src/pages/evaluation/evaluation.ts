import { EvaluationFR12Page } from './../evaluation-fr-12/evaluation-fr-12';
import { ModalEvaluationNotFinishedPage } from './../modal-evaluation-not-finished/modal-evaluation-not-finished';
import { FirebaseObjectObservable } from 'angularFire2';
import { Evaluation } from './../../models/evaluation.model';
import { EvaluationService } from './../../providers/evaluation.service';
import { UserService } from './../../providers/user.service';
import { EvaluationFR2Page } from './../evaluation-fr-02/evaluation-fr-02';
import { AuthService } from './../../providers/auth.service';
import { Component, Input } from '@angular/core';
import { NavController, NavParams, MenuController, ModalController } from 'ionic-angular';
import { User } from "../../models/user.model";
import firebase from "firebase";
import { EvaluationFR11Page } from '../evaluation-fr-11/evaluation-fr-11';
import { RiskExibitionPage } from '../risk-exibition/risk-exibition';
import { EvaluationFR8Page } from '../evaluation-fr-08/evaluation-fr-08';
import { EvaluationFR10Page } from '../evaluation-fr-10/evaluation-fr-10';

@Component({
  selector: 'page-evaluation',
  templateUrl: 'evaluation.html',
})
export class EvaluationPage {

    user: User;

  constructor(
    public authService: AuthService,
    public evaluationService: EvaluationService,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController,
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
      this.evaluationService.evaluationStartedNotFinished(this.user.uid)
        .first()
        .subscribe((evaluationNotFinished: boolean) => {
            let newEvaluation: boolean = false;

            if (!evaluationNotFinished) {
              console.log("Nova avaliação!"); 

              this.newEvaluation();

              newEvaluation = true;

              this.goAnswer();
            }
            else {
              console.log("Existe uma avaliação não concluída!");

              let newEvaluationModal = this.modalCtrl.create(ModalEvaluationNotFinishedPage);
              
              newEvaluationModal.present();

              newEvaluationModal.onDidDismiss(() => this.goAnswer());
            }
        });
  }

  private newEvaluation() {
      let timestamp: Object = firebase.database.ServerValue.TIMESTAMP; //Date.now();
      let evaluation = new Evaluation(timestamp, false);
      this.evaluationService.create(evaluation, this.user.uid);
  }

  private goAnswer() {
    this.evaluationService.getCurrentEvaluation(this.user.uid)
      .subscribe((evaluation: Evaluation) => { 
        //inicio preenchimento da avaliaçaõ de risco - voltar
        this.navCtrl.push(EvaluationFR11Page, {evaluation: evaluation}); 
        //this.navCtrl.setRoot(RiskExibitionPage, {evaluation: evaluation});
    });  
  }
}
