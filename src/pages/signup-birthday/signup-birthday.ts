import { SignupGenderPage } from './../signup-gender/signup-gender';
import { Validators, FormBuilder, FormGroup } from '@angular/forms/';
import { User } from './../../models/user.model';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
    public formBuilder: FormBuilder,
    public navCtrl: NavController, 
    public navParams: NavParams,
  ) {
      this.user = navParams.get('user'); 
      this.today = new Date().toISOString();
      this.birthday = this.today;

      this.changed = false;
  }

  onSubmit(): void {
    this.user.birthday = this.birthday;

    console.log("Chamando próxima página...");

    this.navCtrl.push(SignupGenderPage, {user: this.user});
  }

  ionViewDidEnter(): void {
    this.changed = false;
  }
}
