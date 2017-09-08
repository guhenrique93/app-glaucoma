import { EvaluationFR5Page } from './../evaluation-fr-05/evaluation-fr-05';
import { EvaluationPage } from './../evaluation/evaluation';
import { AuthService } from './../../providers/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms/';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-evaluation-fr-04',
  templateUrl: 'evaluation-fr-04.html',
})
export class EvaluationFR4Page {

  evaluationForm: FormGroup;
  answeredOD: boolean = false;
  answeredOE: boolean = false;

  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    public navCtrl: NavController
  ) {
      this.evaluationForm = this.formBuilder.group({
        why: '',      
        riskFactorOD: '',
        riskFactorOE: ''
      }, {validator: this.checkFields()});
  }

  checkFields(){
    return (group: FormGroup): {[key: string]: any} => {
        if (group.controls['riskFactorOD'].value && group.controls['riskFactorOE'].value) {
          return null;
        }
        else if (group.controls['why'].value) {
          return null;        
        }
        else {
          return {"nada preenchido": false};
        }
    }
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
    this.navCtrl.push(EvaluationFR5Page);
  }

  answerOD(){
    this.answeredOD = true;
  }

  answerOE(){
    this.answeredOE = true;
  }
}
