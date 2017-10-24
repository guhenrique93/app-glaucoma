import { EvaluationService } from './../../providers/evaluation.service';
import { Evaluation } from './../../models/evaluation.model';
import { Answer } from './../../models/answer.model';
import { ModalIntroFr10Page } from './../modal-intro-fr-10/modal-intro-fr-10';
import { FormBuilder, Validators, FormGroup } from '@angular/forms/';
import { AuthService } from './../../providers/auth.service';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ModalController } from 'ionic-angular';
import { EvaluationFR11Page } from "../evaluation-fr-11/evaluation-fr-11";
import { EvaluationFRWhyPage } from '../evaluation-fr-why/evaluation-fr-why';

@Component({
  selector: 'page-evaluation-fr-10',
  templateUrl: 'evaluation-fr-10.html',
})
export class EvaluationFR10Page {

   evaluationForm: FormGroup;
   answeredRA: boolean = false;
   answeredRB: boolean = false;
   evaluation: Evaluation;
   answer: Answer;
   showA: boolean = true;
   textButton: string = "Avançar";
   
   constructor(
    public authService: AuthService,
    public evaluationService: EvaluationService,
    public formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController, 
    public navCtrl: NavController,
    public navParams: NavParams 
  ) {
      this.evaluationForm = this.formBuilder.group({
        why: '',      
        riskFactorA: '',
        riskFactorB: ''
      }, {validator: this.checkFields()});

      this.evaluation = navParams.get('evaluation') as Evaluation; 
      
      this.answer = new Answer("FR-10"); 

      this.checkAnswer();
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

    let introModal = this.modalCtrl.create(ModalIntroFr10Page);
    
    introModal.present();
  }

  ionViewCanEnter(): Promise<boolean> {    
      return this.authService.authenticated;
  }

  onSubmit(): void {
    if (!this.answer.why) {
      this.saveAnswer();

      this.navCtrl.push(EvaluationFR11Page, {evaluation: this.evaluation});
    } else {
      this.answerWhy();

      this.navCtrl.push(EvaluationFRWhyPage, { destinationPage: EvaluationFR11Page, evaluation: this.evaluation, answer: this.answer});     
    }
  }

  answerRA(){
    this.answeredRA = true;

    this.answer.why = null;    
  }

  answerRB(){
    this.answeredRB = true;

    this.answer.why = null;    
  }

  answerWhy(){
    this.answeredRA = false;
    this.answeredRB = false;
    

    this.answer.answerA = null;
    this.answer.answerB = null;
  }

  private checkAnswer() {
    this.evaluationService.questionAnswered(this.evaluation, this.answer)
        .first()
        .subscribe((questionAnswered: boolean) => {
            if (questionAnswered) {
                this.evaluationService.getAnswer(this.evaluation, this.answer)
                    .subscribe((savedAnswer: Answer) => {
                        if (savedAnswer) {
                            this.answer = savedAnswer;
                        }
                    });
            }
            else {
                console.log("question not answered yet");
            }
        });
  }

  saveAnswer(): void {     
    this.answer.why = null;

    this.answer.answered = true;

    this.evaluationService.saveAnswer(this.evaluation, this.answer);
  }

  backForward(): void {
    this.showA = !this.showA;

    if (this.showA) {
      this.textButton = "Avançar";
    } else {
      this.textButton = "Voltar";
    }
  }
}

