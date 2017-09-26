import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-modal-intro',
  templateUrl: 'modal-intro.html',
})
export class ModalIntroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  close(): void {
    this.navCtrl.pop();
  }
  
}
