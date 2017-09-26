import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-modal-intro-fr-02',
  templateUrl: 'modal-intro-fr-02.html',
})
export class ModalIntroFr2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  close(): void {
    this.navCtrl.pop();
  }
}
