import { AuthService } from './../../providers/auth.service';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public authService: AuthService,
    public navCtrl: NavController
  ) {

  }

  teste()
  {
    alert("Hello world 4 ^^!");
  }

  onSignUp(): void{
    this.navCtrl.push(SignupPage)
  }

  ionViewCanEnter(): Promise<boolean> {
      return this.authService.authenticated;
  }
}
