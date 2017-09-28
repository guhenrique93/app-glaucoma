import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-modal-intro-fr-08',
  templateUrl: 'modal-intro-fr-08.html',
})
export class ModalIntroFr8Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  close(): void {
    this.navCtrl.pop();
  }

}
