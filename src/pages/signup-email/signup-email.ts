import { AuthService } from './../../providers/auth.service';
import { FormGroup } from '@angular/forms/';
import { FormBuilder } from '@angular/forms/';
import { UserService } from './../../providers/user.service';
import { Validators } from '@angular/forms/';
import { FirebaseAuthState } from 'angularFire2';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-signup-email',
  templateUrl: 'signup-email.html',
})
export class SignupEmailPage {

 signupForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserService
  ) {
      let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      this.signupForm = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  onSubmit(): void {
    let loading = this.showLoading();

    let formUser = this.signupForm.value;
    
    this.authService.createAuthUser({
                    email: formUser.email,
                    password: formUser.password
                  }).then((authState: FirebaseAuthState) => {
                    delete formUser.password;  
                    formUser.uid = authState.auth.uid;
                    
                    this.userService.create(formUser)
                      .then(() => {
                          console.log("Usuário cadastrado!");
                          this.navCtrl.setRoot(HomePage);
                          loading.dismiss();
                      }).catch((error: any) => {
                          console.log(error);
                          loading.dismiss();
                          this.showAlert(error);
                        });
                  }).catch((error: any) => {
                    console.log(error);
                    loading.dismiss();
                    this.showAlert(error);
                  });
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
