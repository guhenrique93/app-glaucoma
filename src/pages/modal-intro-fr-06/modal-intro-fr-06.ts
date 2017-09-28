import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-modal-intro-fr-06',
  templateUrl: 'modal-intro-fr-06.html',
})
export class ModalIntroFr6Page {
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
