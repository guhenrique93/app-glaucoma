import { EvaluationService } from './../../providers/evaluation.service';
import { Answer } from './../../models/answer.model';
import { Evaluation } from './../../models/evaluation.model';
import { ModalIntroFr6Page } from './../modal-intro-fr-06/modal-intro-fr-06';
import { EvaluationFR7Page } from './../evaluation-fr-07/evaluation-fr-07';
import { AuthService } from './../../providers/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms/';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ModalController } from 'ionic-angular';
import { EvaluationFRWhyPage } from '../evaluation-fr-why/evaluation-fr-why';

@Component({
  selector: 'page-evaluation-fr-06',
  templateUrl: 'evaluation-fr-06.html',
})
export class EvaluationFR6Page {

  evaluationForm: FormGroup;
  answeredRE: boolean = false;
  answeredLE: boolean = false;
  evaluation: Evaluation;
  answer: Answer;
  showRE: boolean = true;
  textButton: string = "Avançar para OE";
  
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
            riskFactorRE: '',
            riskFactorLE: ''
          }, {validator: this.checkFields()});

      this.evaluation = navParams.get('evaluation') as Evaluation; 
      
      this.answer = new Answer("FR-06"); 

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

    let introModal = this.modalCtrl.create(ModalIntroFr6Page);
    
    introModal.present();
  }

  ionViewCanEnter(): Promise<boolean> {    
      return this.authService.authenticated;
  }

  onSubmit(): void {
    if (!this.answer.why) {
      this.saveAnswer();

      this.navCtrl.push(EvaluationFR7Page, {evaluation: this.evaluation});
    } else {
      this.answerWhy();

      this.navCtrl.push(EvaluationFRWhyPage, { destinationPage: EvaluationFR7Page, evaluation: this.evaluation, answer: this.answer});
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

  backForward(): void {
    this.showRE = !this.showRE;

    if (this.showRE) {
      this.textButton = "Avançar para OE";
    } else {
      this.textButton = "Voltar para OD";
    }
  }
}
