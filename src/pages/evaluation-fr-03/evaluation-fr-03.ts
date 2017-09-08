import { EvaluationFR4Page } from './../evaluation-fr-04/evaluation-fr-04';
import { AuthService } from './../../providers/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms/';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';


@Component({
  selector: 'page-evaluation-fr-03',
  templateUrl: 'evaluation-fr-03.html',
})
export class EvaluationFR3Page {

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
    let why = evaluationForm.why;

    ///TODO: Salvar a resposta no BD
    ///Validações na hora de salvar pra salvar somente o necessário
    this.navCtrl.push(EvaluationFR4Page);
  }

  answerOD(){
    this.answeredOD = true;
  }

  answerOE(){
    this.answeredOE = true;
  }
}