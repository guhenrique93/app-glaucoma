import { EvaluationService } from './../../providers/evaluation.service';
import { RiskCalculatorService } from './../../providers/riskCalculator.service';
import { AuthService } from './../../providers/auth.service';
import { Evaluation } from './../../models/evaluation.model';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Score } from '../../models/score.model';

@Component({
  selector: 'page-risk-exibition',
  templateUrl: 'risk-exibition.html',
})
export class RiskExibitionPage {

  evaluation: Evaluation;
  score: Score;
  
  constructor
  (
    public authService: AuthService,
    public evaluationService: EvaluationService,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public riskCalculatorService: RiskCalculatorService
  ) {
      this.evaluation = navParams.get('evaluation') as Evaluation; 

      this.score = new Score();
      this.calculateRisk();
  }

  ionViewCanEnter(): Promise<boolean> {    
      return this.authService.authenticated;
  }

  calculateRisk() {
      this.evaluationService.getEvaluations(this.evaluation.userId)
      .subscribe((evaluations: Evaluation[]) => { 
        
        if (evaluations) {
          console.log(evaluations.length + " avaliações");
          evaluations.forEach(evaluation => {
              this.score = this.riskCalculatorService.calculateRisk(evaluation);
              
          });
        } else {
          console.log("Nenhuma avaliação para o usuário");
        }
    });
  }
}
