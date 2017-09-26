import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-modal-intro-fr-03',
  templateUrl: 'modal-intro-fr-03.html',
})
export class ModalIntroFr3Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  close(): void {
    this.navCtrl.pop();
  }

}
