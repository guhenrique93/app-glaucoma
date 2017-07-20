import { HomePage } from './../home/home';
import { FirebaseAuthState } from 'angularFire2';
import { User } from './../../models/user.model';
import { AuthService } from './../../providers/auth.service';
import { UserService } from './../../providers/user.service';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms/";
import 'rxjs/add/operator/first';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

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
        name: ['', [Validators.required, Validators.minLength(3)]],
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  onSubmit(): void {
    let loading = this.showLoading();

    let formUser = this.signupForm.value;

    let username: string = formUser.username;

    this.userService.userExists(username)
      .first()
      .subscribe((userExists: boolean) => {
          if (!userExists){

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
          else {

              this.showAlert(`O nome de usuário '${username}' já está sendo utilizado em outra conta!`);
              loading.dismiss();

          }
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
