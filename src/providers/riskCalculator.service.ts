import { EvaluationService } from './evaluation.service';
import { Answer } from './../models/answer.model';
import { Observable } from 'rxjs/Rx';
import { FirebaseObjectObservable } from 'angularFire2';
import { AngularFire } from 'angularFire2';
import { Evaluation } from './../models/evaluation.model';
import { Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';

import { BaseService } from './base.service';

@Injectable()
export class RiskCalculatorService extends BaseService {

  constructor(
    public af: AngularFire,
    public evaluationService: EvaluationService,
    public http: HttpModule
  ) {
      super();
  }

  calculateRisk(evaluation: Evaluation) {
    console.log("calculating risk...");
    this.calculateFR12(evaluation);
  }

  private calculateFR12(evaluation: Evaluation) {
      let answer: Answer = new Answer("FR-12");

      console.log("calculating FR-12", answer);
      console.log("EVALUATION UID", evaluation.uid);
      console.log("EVALUATION USER ID", evaluation.userId);

      this.evaluationService.getAnswer(evaluation, answer)
      .subscribe((savedAnswer: Answer) => {
          console.log("answered");
          
          if (savedAnswer) {
              answer = savedAnswer;

              console.log("FR-12: " + answer.answerA);
          }
          else {
              console.log("FR-12 not answered");
          }
      });
  }
}
