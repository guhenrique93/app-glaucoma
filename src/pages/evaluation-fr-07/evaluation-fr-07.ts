import { EvaluationService } from './../../providers/evaluation.service';
import { Evaluation } from './../../models/evaluation.model';
import { Answer } from './../../models/answer.model';
import { EvaluationFR8Page } from './../evaluation-fr-08/evaluation-fr-08';
import { AuthService } from './../../providers/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms/';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ModalController } from 'ionic-angular';
import { EvaluationFRWhyPage } from '../evaluation-fr-why/evaluation-fr-why';
import { ModalIntroFr7Page } from '../modal-intro-fr-07/modal-intro-fr-07';

@Component({
  selector: 'page-evaluation-fr-07',
  templateUrl: 'evaluation-fr-07.html',
})
export class EvaluationFR7Page {

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
      
      this.answer = new Answer("FR-07"); 

      this.checkAnswer();
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
    
    let introModal = this.modalCtrl.create(ModalIntroFr7Page);
    
    introModal.present();
  }

  ionViewCanEnter(): Promise<boolean> {    
      return this.authService.authenticated;
  }

  onSubmit(): void {
    if (!this.answer.why || this.answer.why == 'naoTem') {
      this.saveAnswer();

      this.navCtrl.push(EvaluationFR8Page, {evaluation: this.evaluation});
    } else {
      this.answerWhy();

      this.navCtrl.push(EvaluationFRWhyPage, { destinationPage: EvaluationFR8Page, evaluation: this.evaluation, answer: this.answer});
    }
  }

  answerRA(){
    this.answeredRA = true;

    this.answer.why = null;
    this.answer.answerB = null;    
  }

  answerRB(){
    this.answeredRB = true;

    this.answer.answerA = null;    
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
    if (this.answer.why != 'naoTem') {      
      this.answer.why = null;
    }

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

