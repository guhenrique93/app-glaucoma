import { Answer } from './../../models/answer.model';
import { Evaluation } from './../../models/evaluation.model';
import { EvaluationService } from './../../providers/evaluation.service';
import { ModalIntroFr3Page } from './../modal-intro-fr-03/modal-intro-fr-03';
import { EvaluationFR4Page } from './../evaluation-fr-04/evaluation-fr-04';
import { AuthService } from './../../providers/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms/';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ModalController } from 'ionic-angular';
import { EvaluationFRWhyPage } from '../evaluation-fr-why/evaluation-fr-why';


@Component({
  selector: 'page-evaluation-fr-03',
  templateUrl: 'evaluation-fr-03.html',
})
export class EvaluationFR3Page {

  evaluationForm: FormGroup;
  answeredRE: boolean = false;
  answeredLE: boolean = false;
  evaluation: Evaluation;
  answer: Answer;
  
  constructor
  (
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
          riskFactorRE: '',
          riskFactorLE: ''
        }, {validator: this.checkFields()});

      this.evaluation = navParams.get('evaluation') as Evaluation; 
        
      this.answer = new Answer("FR-03"); 

      this.checkAnswer();
  }

  checkFields(){
    return (group: FormGroup): {[key: string]: any} => {
        if (group.controls['riskFactorRE'].value && group.controls['riskFactorLE'].value) {
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

    let introModal = this.modalCtrl.create(ModalIntroFr3Page);
    
    introModal.present();
  }

  ionViewCanEnter(): Promise<boolean> {    
      return this.authService.authenticated;
  }

  onSubmit(): void {
    if (!this.answer.why) {
      this.saveAnswer();

      this.navCtrl.push(EvaluationFR4Page, {evaluation: this.evaluation});
    } else {
      this.navCtrl.push(EvaluationFRWhyPage, {destinationPage: EvaluationFR4Page, evaluation: this.evaluation, answer: this.answer});      
    }
  }

  answerRE(){
    this.answeredRE = true;
    this.answer.why = null;
  }

  answerLE(){
    this.answeredLE = true;
    this.answer.why = null;
  }

  answerWhy(){
    this.answer.answerRE = null;
    this.answer.answerLE = null;
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
  
}