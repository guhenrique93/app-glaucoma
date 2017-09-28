import { ModalIntroFr9Page } from './../modal-intro-fr-09/modal-intro-fr-09';
import { AuthService } from './../../providers/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms/';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ModalController } from 'ionic-angular';
import { EvaluationFR10Page } from "../evaluation-fr-10/evaluation-fr-10";
import { EvaluationFRWhyPage } from '../evaluation-fr-why/evaluation-fr-why';

@Component({
  selector: 'page-evaluation-fr-09',
  templateUrl: 'evaluation-fr-09.html',
})
export class EvaluationFR9Page {
 
  evaluationForm: FormGroup;
  answeredOD: boolean = false;
  answeredOE: boolean = false;

  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController,
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
    
    let introModal = this.modalCtrl.create(ModalIntroFr9Page);
    
    introModal.present();
  }

  ionViewCanEnter(): Promise<boolean> {    
      return this.authService.authenticated;
  }

  onSubmit(): void {
    let evaluationForm = this.evaluationForm.value;
    
    let fr03A = evaluationForm.riskFactorOD;
    let fr03B = evaluationForm.riskFactorOE;
    let why = evaluationForm.why;
    
    ///TODO: Salvar a resposta no BD
    
    if (!why) {
      this.navCtrl.push(EvaluationFR10Page);
    } else {
      this.navCtrl.push(EvaluationFRWhyPage, { destinationPage: EvaluationFR10Page, FR: 9 });      
    }
  }

  answerOD(){
    this.answeredOD = true;
  }

  answerOE(){
    this.answeredOE = true;
  }
}

