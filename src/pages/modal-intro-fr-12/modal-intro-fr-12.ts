import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-modal-intro-fr-12',
  templateUrl: 'modal-intro-fr-12.html',
})
export class ModalIntroFr12Page {
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
