import { TutorialPage } from './../../pages/tutorial/tutorial';
import { AboutPage } from './../../pages/about/about';
import { ModalAgreementPage } from './../../pages/modal-agreement/modal-agreement';
import { UserProfilePage } from './../../pages/user-profile/user-profile';
import { User } from './../../models/user.model';
import { AuthService } from './../../providers/auth.service';
import { MenuController, App, AlertController, ModalController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { BaseComponent } from "../base.component";

@Component({
  selector: 'user-menu',
  templateUrl: 'user-menu.component.html'
})
export class UserMenuComponent extends BaseComponent {

  @Input('user') currentUser: User;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public app: App,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController
  ) {
      super(alertCtrl, authService, app, menuCtrl);
  }

  onProfile(): void {
    this.navCtrl.push(UserProfilePage);
  }

  openAgreement(): void {
    let agreementModal = this.modalCtrl.create(ModalAgreementPage);
    
    agreementModal.present();
  }

  openAbout(): void {
    this.navCtrl.push(AboutPage);
  }

  openTutorial(): void {
    this.navCtrl.push(TutorialPage);
  }
}
