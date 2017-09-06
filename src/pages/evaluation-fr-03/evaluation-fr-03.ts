import { EvaluationFR4Page } from './../evaluation-fr-04/evaluation-fr-04';
import { AuthService } from './../../providers/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms/';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';


@Component({
  selector: 'page-evaluation-fr-03',
  templateUrl: 'evaluation-fr-03.html',
})
export class EvaluationFR3Page {

  evaluationForm: FormGroup;
  answered: boolean = false;
  
  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    public navCtrl: NavController
  ) {
    this.evaluationForm = this.formBuilder.group({
        riskFactorOD: ['', [Validators.minLength(0)]],
        riskFactorOE: ['', [Validators.minLength(0)]],
        why: ['', [Validators.required]]
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
    let why = evaluationForm.why;

    ///TODO: Salvar a resposta no BD
    this.navCtrl.push(EvaluationFR4Page);
  }

  touched(){
    this.answered = true;
    this.evaluationForm.value.why = "compreensao";
  }
}
