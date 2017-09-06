import { EvaluationFR6Page } from './../evaluation-fr-06/evaluation-fr-06';
import { AuthService } from './../../providers/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms/';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-evaluation-fr-05',
  templateUrl: 'evaluation-fr-05.html',
})
export class EvaluationFR5Page {

  evaluationForm: FormGroup;
  
  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    public navCtrl: NavController
  ) {
    this.evaluationForm = this.formBuilder.group({
        riskFactorOD: ['', [Validators.required]],
        riskFactorOE: ['', [Validators.required]]
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
    
    let fr03OD = evaluationForm.riskFactorOD;
    let fr03OE = evaluationForm.riskFactorOE;

    ///TODO: Salvar a resposta no BD
    this.navCtrl.push(EvaluationFR6Page);
  }

}
