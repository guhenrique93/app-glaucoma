import { ModalIntroFr12Page } from './../modal-intro-fr-12/modal-intro-fr-12';
import { AnswerConfirmationPage } from './../answer-confirmation/answer-confirmation';
import { AuthService } from './../../providers/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms/';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ModalController } from 'ionic-angular';
import { EvaluationFRWhyPage } from '../evaluation-fr-why/evaluation-fr-why';

@Component({
  selector: 'page-evaluation-fr-12',
  templateUrl: 'evaluation-fr-12.html',
})
export class EvaluationFR12Page {

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
      if (group.controls['riskFactorA'].value == '1') {
        return null;
      }
      else if (group.controls['riskFactorA'].value && group.controls['riskFactorB'].value) {
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
    
    let introModal = this.modalCtrl.create(ModalIntroFr12Page);
    
    introModal.present();
  }

  ionViewCanEnter(): Promise<boolean> {    
      return this.authService.authenticated;
  }

  onSubmit(): void {
    let evaluationForm = this.evaluationForm.value;
    
    let riskFactorA = evaluationForm.riskFactorA;
    let riskFactorB = evaluationForm.riskFactorB;
    let why = evaluationForm.why;
    
    ///TODO: Salvar a resposta no BD
    
    if (!why || why == 'condicao') {
      this.navCtrl.push(AnswerConfirmationPage);
    } else {
      this.navCtrl.push(EvaluationFRWhyPage, { destinationPage: AnswerConfirmationPage, FR: 12 });      
    }
  }

  answerRA(){
    this.answeredRA = true;
  }

  answerRB(){
    this.answeredRB = true;
  }
}

