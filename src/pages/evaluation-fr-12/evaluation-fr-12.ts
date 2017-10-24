import { EvaluationService } from './../../providers/evaluation.service';
import { Answer } from './../../models/answer.model';
import { Evaluation } from './../../models/evaluation.model';
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
        
        this.answer = new Answer("FR-12"); 
  
        this.checkAnswer();
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
    if (!this.answer.why || this.answer.why == 'condicao') {
      this.saveAnswer();

      this.navCtrl.push(AnswerConfirmationPage, {evaluation: this.evaluation});
    } else {
      this.answerWhy();

      this.navCtrl.push(EvaluationFRWhyPage, { destinationPage: AnswerConfirmationPage, evaluation: this.evaluation, answer: this.answer}); 
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
    if (this.answer.why != 'condicao') {      
      this.answer.why = null;
    } else if (this.answer.why == 'condicao') {
      this.answer.answerA = null;
      this.answer.answerB = null;
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

