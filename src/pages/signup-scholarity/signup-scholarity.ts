import { FormGroup } from '@angular/forms/';
import { User } from './../../models/user.model';
import { FormBuilder } from '@angular/forms/';
import { Validators } from '@angular/forms/';
import { SignupEmailPage } from './../signup-email/signup-email';
import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-signup-scholarity',
  templateUrl: 'signup-scholarity.html',
})
export class SignupScholarityPage {

  signupForm: FormGroup;
  user: User;
  
  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController, 
    public navParams: NavParams,
  ) {
      this.signupForm = this.formBuilder.group({
        scholarity: ['', [Validators.required]]
      });

      this.user = navParams.get('user'); 
  }

  onSubmit(): void {
    let formUser = this.signupForm.value;
    
    this.user.scholarity = formUser.scholarity;

    console.log("Chamando próxima página...");

    this.navCtrl.push(SignupEmailPage, {user: this.user});
  }
}