import { EvaluationService } from './evaluation.service';
import { Answer } from './../models/answer.model';
import { Observable } from 'rxjs/Rx';
import { FirebaseObjectObservable } from 'angularFire2';
import { AngularFire } from 'angularFire2';
import { Evaluation } from './../models/evaluation.model';
import { Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';

import { BaseService } from './base.service';
import { Score } from '../models/score.model';

@Injectable()
export class RiskCalculatorService extends BaseService {

    totalScore = new Score();

  constructor(
    public af: AngularFire,
    public evaluationService: EvaluationService,
    public http: HttpModule
  ) {
      super();
  }

  calculateRisk(evaluation: Evaluation) {
    console.log("CALCULATING RISK...");
    
    this.calculateFR01(evaluation);
    this.calculateFR02(evaluation);
    this.calculateFR04(evaluation);
    this.calculateFR05(evaluation);
    this.calculateFR06(evaluation);
    this.calculateFR07(evaluation);
    this.calculateFR08(evaluation);
    this.calculateFR09(evaluation);
    this.calculateFR10(evaluation);
    this.calculateFR11(evaluation);
    this.calculateFR12(evaluation);
  }

  private calculateFR01(evaluation: Evaluation) {
    console.log("calculating FR-01");

    //CALCULATE AGE FROM BIRTHDAY

    this.totalScore.LeftEye += 2;
    this.totalScore.RightEye += 2;
  }

  private calculateFR02(evaluation: Evaluation) {
    let answer: Answer = new Answer("FR-02");

    console.log("calculating FR-02", answer);

    this.evaluationService.getAnswer(evaluation, answer)
    .subscribe((savedAnswer: Answer) => {
        console.log("answered");
        
        if (savedAnswer) {
            answer = savedAnswer;

            console.log("FR-02 answer A: " + answer.answerA);
            console.log("FR-02 answer B: " + answer.answerB);
        }
        else {
            console.log("FR-02 not answered");
        }
    });
  }
  
  private calculateFR03(evaluation: Evaluation) {
    let answer: Answer = new Answer("FR-03");

    console.log("calculating FR-03", answer);

    this.evaluationService.getAnswer(evaluation, answer)
    .subscribe((savedAnswer: Answer) => {
        console.log("answered");
        
        if (savedAnswer) {
            answer = savedAnswer;

            console.log("FR-03 answer A: " + answer.answerA);
            console.log("FR-03 answer B: " + answer.answerB);
        }
        else {
            console.log("FR-03 not answered");
        }
    });
  }
  
  private calculateFR04(evaluation: Evaluation) {
    let answer: Answer = new Answer("FR-04");

    console.log("calculating FR-04", answer);

    this.evaluationService.getAnswer(evaluation, answer)
    .subscribe((savedAnswer: Answer) => {
        console.log("answered");
        
        if (savedAnswer) {
            answer = savedAnswer;

            console.log("FR-04 answer A: " + answer.answerA);
            console.log("FR-04 answer B: " + answer.answerB);
        }
        else {
            console.log("FR-04 not answered");
        }
    });
  }
  
  private calculateFR05(evaluation: Evaluation) {
    let answer: Answer = new Answer("FR-05");

    console.log("calculating FR-05", answer);

    this.evaluationService.getAnswer(evaluation, answer)
    .subscribe((savedAnswer: Answer) => {
        console.log("answered");
        
        if (savedAnswer) {
            answer = savedAnswer;

            console.log("FR-05 answer A: " + answer.answerA);
            console.log("FR-05 answer B: " + answer.answerB);
        }
        else {
            console.log("FR-05 not answered");
        }
    });
  }
  
  private calculateFR06(evaluation: Evaluation) {
    //TODO: Atualizar o FR06 conforme email

    let answer: Answer = new Answer("FR-06");

    console.log("calculating FR-06", answer);

    this.evaluationService.getAnswer(evaluation, answer)
    .subscribe((savedAnswer: Answer) => {
        console.log("answered");
        
        if (savedAnswer) {
            answer = savedAnswer;

            console.log("FR-06 answer A: " + answer.answerA);
            console.log("FR-06 answer B: " + answer.answerB);
        }
        else {
            console.log("FR-06 not answered");
        }
    });
  }
  
  private calculateFR07(evaluation: Evaluation) {
    let answer: Answer = new Answer("FR-07");

    console.log("calculating FR-07", answer);

    this.evaluationService.getAnswer(evaluation, answer)
    .subscribe((savedAnswer: Answer) => {
        console.log("answered");
        
        if (savedAnswer) {
            answer = savedAnswer;

            console.log("FR-07 answer A: " + answer.answerA);
            console.log("FR-07 answer B: " + answer.answerB);
        }
        else {
            console.log("FR-07 not answered");
        }
    });
  }
  
  private calculateFR08(evaluation: Evaluation) {
    let answer: Answer = new Answer("FR-08");

    console.log("calculating FR-08", answer);

    this.evaluationService.getAnswer(evaluation, answer)
    .subscribe((savedAnswer: Answer) => {
        console.log("answered");
        
        if (savedAnswer) {
            answer = savedAnswer;

            console.log("FR-08 answer A: " + answer.answerA);
            console.log("FR-08 answer B: " + answer.answerB);
        }
        else {
            console.log("FR-08 not answered");
        }
    });
  }

  private calculateFR09(evaluation: Evaluation) {
    let answer: Answer = new Answer("FR-09");

    console.log("calculating FR-09", answer);

    this.evaluationService.getAnswer(evaluation, answer)
    .subscribe((savedAnswer: Answer) => {
        console.log("answered");
        
        if (savedAnswer) {
            answer = savedAnswer;

            console.log("FR-09 answer A: " + answer.answerA);
            console.log("FR-09 answer B: " + answer.answerB);
        }
        else {
            console.log("FR-09 not answered");
        }
    });
  }
  
  private calculateFR10(evaluation: Evaluation) {
    let answer: Answer = new Answer("FR-10");

    console.log("calculating FR-10", answer);

    this.evaluationService.getAnswer(evaluation, answer)
    .subscribe((savedAnswer: Answer) => {
        console.log("answered");
        
        if (savedAnswer) {
            answer = savedAnswer;

            console.log("FR-10 answer A: " + answer.answerA);
            console.log("FR-10 answer B: " + answer.answerB);
        }
        else {
            console.log("FR-10 not answered");
        }
    });
 }

  private calculateFR11(evaluation: Evaluation) {
      let answer: Answer = new Answer("FR-11");

      this.evaluationService.getAnswer(evaluation, answer)
      .subscribe((savedAnswer: Answer) => {
          console.log("answered");
          
          if (savedAnswer) {
              answer = savedAnswer;

              console.log("FR-11 answer A: " + answer.answerA);
              console.log("FR-11 answer B: " + answer.answerB);
          }
          else {
              console.log("FR-11 not answered");
          }
      });
  }

  private calculateFR12(evaluation: Evaluation) {
    let answer: Answer = new Answer("FR-12");

    this.evaluationService.getAnswer(evaluation, answer)
    .subscribe((savedAnswer: Answer) => {
        console.log("answered");
        
        if (savedAnswer) {
            answer = savedAnswer;

            console.log("FR-12 answer A: " + answer.answerA);
            console.log("FR-12 answer B: " + answer.answerB);
        }
        else {
            console.log("FR-12 not answered");
        }
    });
}
}
