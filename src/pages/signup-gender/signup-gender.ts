import { SignupBirthplacePage } from './../signup-birthplace/signup-birthplace';
import { FormGroup } from '@angular/forms/';
import { FormBuilder } from '@angular/forms/';
import { Validators } from '@angular/forms/';
import { User } from './../../models/user.model';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-signup-gender',
  templateUrl: 'signup-gender.html',
})
export class SignupGenderPage {

  signupForm: FormGroup;
  user: User;
  
  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController, 
    public navParams: NavParams,
  ) {
      this.signupForm = this.formBuilder.group({
        gender: ['', [Validators.required]]
      });

      this.user = navParams.get('user'); 
  }

  onSubmit(): void {
    let formUser = this.signupForm.value;
    
    this.user.gender = formUser.gender;

    console.log("Chamando próxima página...");

    this.navCtrl.push(SignupBirthplacePage, {user: this.user});
  }
}