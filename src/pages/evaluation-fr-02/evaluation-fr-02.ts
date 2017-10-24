import { Answer } from './../../models/answer.model';
import { EvaluationService } from './../../providers/evaluation.service';
import { ModalEvaluationNotFinishedPage } from './../modal-evaluation-not-finished/modal-evaluation-not-finished';
import { Evaluation } from './../../models/evaluation.model';
import { EvaluationFRWhyPage } from './../evaluation-fr-why/evaluation-fr-why';
import { ModalIntroFr2Page } from './../modal-intro-fr-02/modal-intro-fr-02';
import { EvaluationFR3Page } from './../evaluation-fr-03/evaluation-fr-03';
import { FormBuilder, FormGroup, Validators } from '@angular/forms/';
import { AuthService } from './../../providers/auth.service';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-evaluation-fr-02',
  templateUrl: 'evaluation-fr-02.html',
})
export class EvaluationFR2Page {

  evaluationForm: FormGroup;
  evaluationFormWhy: FormGroup;
  doubt: boolean = false;
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
        riskFactor: ['', [Validators.required]]
      });

    this.evaluationFormWhy = this.formBuilder.group({
        why: ['', [Validators.required]]
      });

    this.evaluation = navParams.get('evaluation') as Evaluation; 

    this.answer = new Answer("FR-02");    

    this.checkAnswer();
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true, 'user-menu');   

    let introModal = this.modalCtrl.create(ModalIntroFr2Page);
    
    introModal.present();
  }

  ionViewCanEnter(): Promise<boolean> {    
      return this.authService.authenticated;
  }

  onSubmit(): void {
    let evaluationForm = this.evaluationForm.value;
    
    let fr02 = evaluationForm.riskFactor;

    if (fr02 == 'incerteza'){
      this.doubt = true;  
    }
    else {
      this.saveAnswer();
    
      this.navCtrl.push(EvaluationFR3Page, {evaluation: this.evaluation});
    }
  }

  onSubmitWhy(): void {
    this.saveAnswer();

    this.navCtrl.push(EvaluationFRWhyPage, {destinationPage: EvaluationFR3Page, evaluation: this.evaluation, answer: this.answer});
  }

  back(): void {
    this.doubt = false;
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
    this.answer.answered = true;
    
    this.evaluationService.saveAnswer(this.evaluation, this.answer);
  }
  
}
