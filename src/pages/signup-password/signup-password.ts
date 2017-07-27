import { SignupAgreementPage } from './../signup-agreement/signup-agreement';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms/';
import { User } from './../../models/user.model';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-signup-password',
  templateUrl: 'signup-password.html',
})
export class SignupPasswordPage {

  signupForm: FormGroup;
  user: User;
  
  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController, 
    public navParams: NavParams,
  ) {
      this.signupForm = this.formBuilder.group({
          password: ['', [Validators.required, Validators.minLength(6)]],
          passwordConfirm: ['', [
            Validators.required, 
            Validators.minLength(6),
            this.matchOtherValidator('password')
          ]]
      });

      this.user = navParams.get('user'); 
  }

  onSubmit(): void {
    let formUser = this.signupForm.value;
    
    this.user.password = formUser.password;

    console.log("Chamando próxima página...");

    this.navCtrl.push(SignupAgreementPage, {user: this.user});
  }

  matchOtherValidator (otherControlName: string) {

    let thisControl: FormControl;
    let otherControl: FormControl;

    return function matchOtherValidate (control: FormControl) {

      if (!control.parent) {
        return null;
      }

      // Initializing the validator.
      if (!thisControl) {
        thisControl = control;
        otherControl = control.parent.get(otherControlName) as FormControl;
        if (!otherControl) {
          throw new Error('matchOtherValidator(): other control is not found in parent group');
        }
        otherControl.valueChanges.subscribe(() => {
          thisControl.updateValueAndValidity();
        });
      }

      if (!otherControl) {
        return null;
      }

      if (otherControl.value !== thisControl.value) {
        return {
          matchOther: true
        };
      }

      return null;

    }
  }
}