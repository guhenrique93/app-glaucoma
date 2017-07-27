import { SignupResidenceplacePage } from './../signup-residenceplace/signup-residenceplace';
import { FormGroup } from '@angular/forms/';
import { FormBuilder } from '@angular/forms/';
import { Validators } from '@angular/forms/';
import { User } from './../../models/user.model';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-signup-birthplace',
  templateUrl: 'signup-birthplace.html',
})
export class SignupBirthplacePage {

  signupForm: FormGroup;
  user: User;
  
  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController, 
    public navParams: NavParams,
  ) {
      this.signupForm = this.formBuilder.group({
        city: ['', [Validators.required, Validators.minLength(3)]]
      });

      this.user = navParams.get('user'); 
  }

  onSubmit(): void {
    let formUser = this.signupForm.value;
    
    this.user.birthplace = formUser.city;

    console.log("Chamando próxima página...");

    this.navCtrl.push(SignupResidenceplacePage, {user: this.user});
  }
}

