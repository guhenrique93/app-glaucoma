import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-modal-evaluation-not-finished',
  templateUrl: 'modal-evaluation-not-finished.html',
})
export class ModalEvaluationNotFinishedPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  close(): void {
    this.navCtrl.pop();
  }
}
