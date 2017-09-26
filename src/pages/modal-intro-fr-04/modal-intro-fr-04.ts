import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-modal-intro-fr-04',
  templateUrl: 'modal-intro-fr-04.html',
})
export class ModalIntroFr4Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  close(): void {
    this.navCtrl.pop();
  }

}
