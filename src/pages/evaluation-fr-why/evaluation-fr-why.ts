import { Evaluation } from './../../models/evaluation.model';
import { EvaluationService } from './../../providers/evaluation.service';
import { Answer } from './../../models/answer.model';
import { AuthService } from './../../providers/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms/';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-evaluation-fr-why',
  templateUrl: 'evaluation-fr-why.html',
})
export class EvaluationFRWhyPage {
  evaluationForm: FormGroup;
  destinationPage;
  answer: Answer;
  evaluation: Evaluation;
  opened: boolean = false;

  constructor
  (
    public authService: AuthService,
    public evaluationService: EvaluationService,
    public formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.evaluationForm = this.formBuilder.group({
        why: []
      });

     this.destinationPage = navParams.get('destinationPage'); 

     this.answer = navParams.get('answer') as Answer; 

     this.evaluation = navParams.get('evaluation') as Evaluation; 
  }
  
  ionViewDidLoad() {
    this.menuCtrl.enable(true, 'user-menu');   
  }

  ionViewWillEnter() {
    if (this.opened) {
      this.navCtrl.pop();
    }
    
    this.opened = true;
  }

  ionViewCanEnter(): Promise<boolean> {    
      return this.authService.authenticated;
  }

  onSubmit(): void {
    this.evaluationService.saveAnswer(this.evaluation, this.answer);

    this.navCtrl.push(this.destinationPage, {evaluation: this.evaluation});
  }

  voltar(): void {
    this.navCtrl.pop();
  }
}