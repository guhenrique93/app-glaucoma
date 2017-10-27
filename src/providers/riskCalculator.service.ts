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
    this.calculateFR02(evaluation);
  }

  private calculateFR02(evaluation: Evaluation) {
      let answer: Answer = new Answer("FR-02");

      console.log("calculating FR-02", answer);

      this.evaluationService.getAnswer(evaluation, answer)
      .subscribe((savedAnswer: Answer) => {
          console.log("answered");
          
          if (savedAnswer) {
              answer = savedAnswer;

              console.log("FR-02: " + answer.answerA);
          }
          else {
              console.log("FR-02 not answered");
          }
      });
  }
}
