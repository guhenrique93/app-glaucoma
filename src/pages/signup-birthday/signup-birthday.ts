import { AuthService } from './../../providers/auth.service';
import { UserService } from './../../providers/user.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms/';
import { User } from './../../models/user.model';
import { SignupEmailPage } from './../signup-email/signup-email';
import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-signup-birthday',
  templateUrl: 'signup-birthday.html',
})
export class SignupBirthdayPage {

  birthday;
  today;
  user: User;
  changed: boolean = true;
  firstTime: boolean = false;
  
  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserService
  ) {
      this.user = navParams.get('user'); 
      this.today = new Date().toISOString();
      this.birthday = this.today;

      this.changed = false;
  }

  onSubmit(): void {
    let loading = this.showLoading();

    this.user.birthday = this.birthday;

    console.log("Chamando próxima página...");

    this.navCtrl.push(SignupEmailPage, {user: this.user});

    loading.dismiss();
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Aguarde um instante...'
    });

    loading.present();

    return loading;
  }

  private showAlert(mensagem: string): void {
    this.alertCtrl.create({
      message: mensagem,
      buttons: ['Ok']
    }).present();
  }

  ionViewDidEnter(): void {
    this.changed = false;
  }
}
