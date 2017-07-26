import { SignupBirthdayPage } from './../signup-birthday/signup-birthday';
import { User } from './../../models/user.model';
import { SignupEmailPage } from './../signup-email/signup-email';
import { AuthService } from './../../providers/auth.service';
import { UserService } from './../../providers/user.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms/';
import { FirebaseAuthState } from 'angularFire2';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-signup-name',
  templateUrl: 'signup-name.html',
})

export class SignupNamePage {

  signupForm: FormGroup;
  user: User;
  
  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserService
  ) {
      this.signupForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)]]
      });

      this.user = new User();
  }

  onSubmit(): void {
    let loading = this.showLoading();

    let formUser = this.signupForm.value;
    
    this.user.name = formUser.name;

    console.log("Chamando próxima página...");

    this.navCtrl.push(SignupBirthdayPage, {user: this.user});

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
}
