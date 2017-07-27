import { ModalAgreementPage } from './../modal-agreement/modal-agreement';
import { FormGroup } from '@angular/forms/';
import { User } from './../../models/user.model';
import { AuthService } from './../../providers/auth.service';
import { FormBuilder } from '@angular/forms/';
import { UserService } from './../../providers/user.service';
import { Validators } from '@angular/forms/';
import { FirebaseAuthState } from 'angularFire2';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';


@Component({
  selector: 'page-signup-agreement',
  templateUrl: 'signup-agreement.html',
})
export class SignupAgreementPage {

  signupForm: FormGroup;
  user: User;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserService,
  ) {
      this.signupForm = this.formBuilder.group({
        agreement: ['', [Validators.required]]
      });

      this.user = navParams.get('user'); 
  }

  onSubmit(): void {
    let loading = this.showLoading();

    let formUser = this.signupForm.value;
    
    this.authService.createAuthUser({
                    email: this.user.email,
                    password: this.user.password
                  }).then((authState: FirebaseAuthState) => {

                    this.user.uid = authState.auth.uid;
                    this.user.concordant = formUser.agreement;
                    delete this.user.password;  

                    this.userService.create(this.user)
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

  openAgreement(): void {
    let agreementModal = this.modalCtrl.create(ModalAgreementPage);
    
    agreementModal.present();
  }
}