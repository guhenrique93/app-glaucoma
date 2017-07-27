import { SignupScholarityPage } from './../signup-scholarity/signup-scholarity';
import { Validators } from '@angular/forms/';
import { FormBuilder } from '@angular/forms/';
import { User } from './../../models/user.model';
import { FormGroup } from '@angular/forms/';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-signup-residenceplace',
  templateUrl: 'signup-residenceplace.html',
})
export class SignupResidenceplacePage {

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
    
    this.user.residencePlace = formUser.city;

    console.log("Chamando próxima página...");

    this.navCtrl.push(SignupScholarityPage, {user: this.user});
  }
}

