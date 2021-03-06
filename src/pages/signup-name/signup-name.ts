import { SignupBirthdayPage } from './../signup-birthday/signup-birthday';
import { User } from './../../models/user.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms/';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-signup-name',
  templateUrl: 'signup-name.html',
})

export class SignupNamePage {

  signupForm: FormGroup;
  user: User;
  
  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController, 
    public navParams: NavParams,
  ) {
      this.signupForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)]]
      });

      this.user = new User();
  }

  onSubmit(): void {
    let formUser = this.signupForm.value;
    
    this.user.name = formUser.name;

    console.log("Chamando próxima página...");

    this.navCtrl.push(SignupBirthdayPage, {user: this.user});
  }
}
