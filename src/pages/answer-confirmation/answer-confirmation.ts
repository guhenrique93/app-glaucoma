import { EvaluationService } from './../../providers/evaluation.service';
import { Evaluation } from './../../models/evaluation.model';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from "firebase";

@Component({
  selector: 'page-answer-confirmation',
  templateUrl: 'answer-confirmation.html',
})
export class AnswerConfirmationPage {

  evaluation: Evaluation;
  
  constructor
  (
    public evaluationService: EvaluationService,
    public navCtrl: NavController, 
    public navParams: NavParams
  ) 
  {
    this.evaluation = navParams.get('evaluation') as Evaluation; 
  }

  calcularRisco() {

    let timestamp: Object = firebase.database.ServerValue.TIMESTAMP; //Date.now();
    
    this.evaluation.timestampFinished = timestamp;

    this.evaluationService.finishEvaluation(this.evaluation);

    alert("Calculando risco... (é só um teste)");

    this.goHome();
  }

  salvarDados() {
    alert("Seus lançamentos foram salvos com sucessos e precisam ser reconfirmados para cálculo posterior do seu risco.");    

    this.goHome();
  }

  goHome() {
    this.navCtrl.setRoot(HomePage);
  }
}
