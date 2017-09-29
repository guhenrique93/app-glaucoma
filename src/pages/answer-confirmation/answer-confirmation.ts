import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-answer-confirmation',
  templateUrl: 'answer-confirmation.html',
})
export class AnswerConfirmationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  calcularRisco() {
    alert("Calculando risco... (é só um teste)");

    this.goHome();
  }

  salvarDados() {
    alert("Seus lançamentos foram salvos com sucessos e precisam ser reconfirmados para cálculo posterior do seu risco. (é só um teste)");    

    this.goHome();
  }

  goHome() {
    this.navCtrl.setRoot(HomePage);
  }
}
