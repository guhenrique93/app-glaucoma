import { HomePage } from './../home/home';
import { AuthService } from './../../providers/auth.service';
import { SignupPage } from './../signup/signup';
import { FormBuilder, FormGroup, Validators } from '@angular/forms/';
import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})

export class SigninPage {

  signinForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {

      let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      this.signinForm = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  onSubmit(): void{

    let loading: Loading = this.showLoading();

    this.authService.signinWithEmail(this.signinForm.value)
      .then((isLogged: boolean) => {
          if (isLogged){
            this.navCtrl.setRoot(HomePage);
            loading.dismiss();
          }
      }).catch((error: any) => {
          console.log(error);
          loading.dismiss();
          this.showAlert(error);
        });
  }

  onSignup(): void {
    this.navCtrl.push(SignupPage);
  }

  onHome(): void {
    this.navCtrl.push(HomePage)
      .then((hasAccess: boolean) => {
        console.log('Autorizado a entrar na página', hasAccess);
      }).catch(err => {        
        console.log('Não autorizado a entrar na página: ', err);
      });
  }

  onLogout(): void {
    this.authService.logout();
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
