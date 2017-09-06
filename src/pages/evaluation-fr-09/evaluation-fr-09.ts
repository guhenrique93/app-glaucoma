import { AuthService } from './../../providers/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms/';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { EvaluationFR10Page } from "../evaluation-fr-10/evaluation-fr-10";

@Component({
  selector: 'page-evaluation-fr-09',
  templateUrl: 'evaluation-fr-09.html',
})
export class EvaluationFR9Page {
 
 evaluationForm: FormGroup;
  
  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    public navCtrl: NavController
  ) {
    this.evaluationForm = this.formBuilder.group({
        riskFactorA: ['', [Validators.minLength(0)]],
        riskFactorB: ['', [Validators.minLength(0)]]
      });
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true, 'user-menu');    
  }

  ionViewCanEnter(): Promise<boolean> {    
      return this.authService.authenticated;
  }

  onSubmit(): void {
    let evaluationForm = this.evaluationForm.value;
    
    let fr03A = evaluationForm.riskFactorA;
    let fr03B = evaluationForm.riskFactorB;

    ///TODO: Salvar a resposta no BD
    this.navCtrl.push(EvaluationFR10Page);
  }
}

