import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-modal-intro-fr-05',
  templateUrl: 'modal-intro-fr-05.html',
})
export class ModalIntroFr5Page {
  firstOK: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  close(): void {
    if (this.firstOK) {
      this.navCtrl.pop();
    }

    this.firstOK = !this.firstOK;
  }

}
