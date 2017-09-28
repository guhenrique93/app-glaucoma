import { EvaluationFR9Page } from './../evaluation-fr-09/evaluation-fr-09';
import { AuthService } from './../../providers/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms/';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ModalController } from 'ionic-angular';
import { ModalIntroFr8Page } from '../modal-intro-fr-08/modal-intro-fr-08';
import { EvaluationFRWhyPage } from '../evaluation-fr-why/evaluation-fr-why';

@Component({
  selector: 'page-evaluation-fr-08',
  templateUrl: 'evaluation-fr-08.html',
})
export class EvaluationFR8Page {
  
  evaluationForm: FormGroup;
  answeredRA: boolean = false;
  answeredRB: boolean = false;

  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController,
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
      if (group.controls['riskFactorA'].value && group.controls['riskFactorB'].value) {
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
    
    let introModal = this.modalCtrl.create(ModalIntroFr8Page);
    
    introModal.present();
  }

  ionViewCanEnter(): Promise<boolean> {    
      return this.authService.authenticated;
  }

  onSubmit(): void {
    let evaluationForm = this.evaluationForm.value;
    
    let fr03Diabetes = evaluationForm.riskFactorA;
    let fr03Complicacoes = evaluationForm.riskFactorB;
    let why = evaluationForm.why;

    ///TODO: Salvar a resposta no BD
    
    if (!why) {
      this.navCtrl.push(EvaluationFR9Page);
    } else {
      this.navCtrl.push(EvaluationFRWhyPage, { destinationPage: EvaluationFR9Page, FR: 8 });      
    }
  }

  answerRA(){
    this.answeredRA = true;
  }

  answerRB(){
    this.answeredRB = true;
  }
}

