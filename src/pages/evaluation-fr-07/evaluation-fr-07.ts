import { EvaluationFR8Page } from './../evaluation-fr-08/evaluation-fr-08';
import { AuthService } from './../../providers/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms/';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-evaluation-fr-07',
  templateUrl: 'evaluation-fr-07.html',
})
export class EvaluationFR7Page {

  evaluationForm: FormGroup;
  answeredRA: boolean = false;
  answeredRB: boolean = false;

  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    public navCtrl: NavController
  ) {
      this.evaluationForm = this.formBuilder.group({
        why: '',      
        riskFactorA: '',
        riskFactorB: ''
      }, {validator: this.checkFields()});
  }

  checkFields(){
    return (group: FormGroup): {[key: string]: any} => {
      if (group.controls['riskFactorA'].value || group.controls['riskFactorB'].value) {
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
    
    let fr03UmFamiliar = evaluationForm.riskFactorA;
    let fr03MaisDeUmFamiliar = evaluationForm.riskFactorB;

    ///TODO: Salvar a resposta no BD
    this.navCtrl.push(EvaluationFR8Page);
  }

  answerRA(){
    this.answeredRA = true;
  }

  answerRB(){
    this.answeredRB = true;
  }
}

