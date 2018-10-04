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
import { UserService } from './user.service';
import { User } from 'firebase';

@Injectable()
export class RiskCalculatorService extends BaseService {

    totalScore = new Score();

  constructor(
    public af: AngularFire,
    public evaluationService: EvaluationService,
    public userService: UserService,
    public http: HttpModule
  ) {
      super();
  }

  calculateRisk(evaluation: Evaluation) : Promise<Score> {
    console.log("CALCULATING RISK...");

    this.totalScore = new Score();
 
    console.log("score zerado: ", this.totalScore);
    
    return new Promise<Score>((resolve, reject) => {
        
        Promise.all(
            [
                this.calculateFR01(evaluation),
                this.calculateFR02(evaluation),
                this.calculateFR03(evaluation),
                this.calculateFR04(evaluation),
                this.calculateFR05(evaluation),
                this.calculateFR06(evaluation),
                this.calculateFR07(evaluation),
                this.calculateFR08(evaluation),
                this.calculateFR09(evaluation),
                this.calculateFR10(evaluation),
                this.calculateFR11(evaluation), 
                this.calculateFR12(evaluation)
            ]
        )
        .then(() => {
            resolve(this.totalScore);            
        });

    });
  }

  private calculateFR01(evaluation: Evaluation) : Promise<any> {
    console.log("calculating FR-01");

    return new Promise((resolve, reject) => {
            
        this.userService.getAge(evaluation.userId)
            .subscribe((age : number) => {
                    console.log("age: "+ age);

                    let scoreAge: number;

                    if (age < 40) 
                    {
                        scoreAge = 0;
                    } 
                    else if (age < 59) 
                    {
                        scoreAge = 2;
                    } 
                    else //age >= 60
                    { 
                        scoreAge = 4;
                    }

                    console.log("score age: ", scoreAge);

                    this.totalScore.rightEye += scoreAge;
                    this.totalScore.leftEye += scoreAge;
                            
                    console.log("score após FR01: ", this.totalScore);

                    resolve();
            });    
        });
  }

  private calculateFR02(evaluation: Evaluation) : Promise<any> {
    let answer: Answer = new Answer("FR-02");

    return new Promise((resolve, reject) => {
            
        this.evaluationService.getAnswer(evaluation, answer)
        .subscribe((savedAnswer: Answer) => {
            if (savedAnswer) {
                answer = savedAnswer;

                console.log("calculating FR-02", answer);

                let scoreRace: number;

                switch(answer.answer)
                {
                    case "caucasiana":
                    {
                        scoreRace = 0;
                    }
                    break;

                    case "amarela":
                    {
                        scoreRace = 2;
                    }
                    break;

                    case "parda":
                    {
                        scoreRace = 4;
                    }
                    break;

                    default: //caso o usuário não tenha respondido a questão com alguma das alternativas
                    {
                        this.totalScore.riskNotDiscartedRE += 4;
                        this.totalScore.riskNotDiscartedLE += 4;
                    }
                    break;
                }

                this.totalScore.rightEye += scoreRace;
                this.totalScore.leftEye += scoreRace;

                console.log("score após FR02: ", this.totalScore);
            }
            else {
                console.log("FR-02 not answered");
            }

            resolve();
        });
    });
  }
  
  private calculateFR03(evaluation: Evaluation) : Promise<any> {
    let answer: Answer = new Answer("FR-03");

    return new Promise((resolve, reject) => {

        this.evaluationService.getAnswer(evaluation, answer)
        .subscribe((savedAnswer: Answer) => {
            if (savedAnswer) {
                answer = savedAnswer;

                console.log("calculating FR-03", answer);

                let scoreRightEye: number;

                switch(answer.answerRE)
                {
                    case "0":
                    {
                        scoreRightEye = 0;
                    }
                    break;

                    case "3":
                    {
                        scoreRightEye = 2;
                    }
                    break;

                    case "10":
                    {
                        scoreRightEye = 4;
                    }
                    break;

                    case "30":
                    {
                        scoreRightEye = 6;
                    }
                    break;

                    default: //caso o usuário não tenha respondido a questão com alguma das alternativas
                    {
                        this.totalScore.riskNotDiscartedRE += 2;
                    }
                    break;
                }

                this.totalScore.rightEye += scoreRightEye;


                let scoreLeftEye: number;

                switch(answer.answerLE)
                {
                    case "0":
                    {
                        scoreLeftEye = 0;
                    }
                    break;

                    case "3":
                    {
                        scoreLeftEye = 2;
                    }
                    break;

                    case "10":
                    {
                        scoreLeftEye = 4;
                    }
                    break;

                    case "30":
                    {
                        scoreLeftEye = 6;
                    }
                    break;

                    default: //caso o usuário não tenha respondido a questão com alguma das alternativas
                    {
                        this.totalScore.riskNotDiscartedLE += 2;
                    }
                    break;
                }

                this.totalScore.leftEye += scoreLeftEye;

                console.log("score após FR03: ", this.totalScore);
            }
            else {
                console.log("FR-03 not answered");
            }

            resolve();
        });
    });
  }
  
  private calculateFR04(evaluation: Evaluation) : Promise<any> {
    let answer: Answer = new Answer("FR-04");

    return new Promise((resolve, reject) => {

        this.evaluationService.getAnswer(evaluation, answer)
        .subscribe((savedAnswer: Answer) => {
            if (savedAnswer) {
                answer = savedAnswer;

                console.log("calculating FR-04", answer);

                let scoreRightEye: number;

                switch(answer.answerRE)
                {
                    case "0":
                    {
                        scoreRightEye = 0;
                    }
                    break;

                    case "15":
                    {
                        scoreRightEye = 2;
                    }
                    break;

                    case "-60":
                    {
                        scoreRightEye = 4;
                    }
                    break;

                    case "+60":
                    {
                        scoreRightEye = 6;
                    }
                    break;

                    default: //caso o usuário não tenha respondido a questão com alguma das alternativas
                    {
                        this.totalScore.riskNotDiscartedRE += 6;
                    }
                    break;
                }

                this.totalScore.rightEye += scoreRightEye;


                let scoreLeftEye: number;

                switch(answer.answerLE)
                {
                    case "0":
                    {
                        scoreLeftEye = 0;
                    }
                    break;

                    case "15":
                    {
                        scoreLeftEye = 2;
                    }
                    break;

                    case "-60":
                    {
                        scoreLeftEye = 4;
                    }
                    break;

                    case "+60":
                    {
                        scoreLeftEye = 6;
                    }
                    break;

                    default: //caso o usuário não tenha respondido a questão com alguma das alternativas
                    {
                        this.totalScore.riskNotDiscartedLE += 6;
                    }
                    break;
                }

                this.totalScore.leftEye += scoreLeftEye;

                console.log("score após FR04: ", this.totalScore);
            }
            else {
                console.log("FR-04 not answered");
            }

            resolve();
        });
    });
  }
  
  private calculateFR05(evaluation: Evaluation) : Promise<any> {
    let answer: Answer = new Answer("FR-05");

    return new Promise((resolve, reject) => {

        this.evaluationService.getAnswer(evaluation, answer)
        .subscribe((savedAnswer: Answer) => {
            if (savedAnswer) {
                answer = savedAnswer;

                console.log("calculating FR-05", answer);

                let scoreRightEye: number;

                switch(answer.answerRE)
                {
                    case "0":
                    {
                        scoreRightEye = 0;
                    }
                    break;

                    case "30":
                    {
                        scoreRightEye = 2;
                    }
                    break;

                    case "-180":
                    {
                        scoreRightEye = 4;
                    }
                    break;

                    case "+180":
                    {
                        scoreRightEye = 8;
                    }
                    break;

                    default: //caso o usuário não tenha respondido a questão com alguma das alternativas
                    {
                        this.totalScore.riskNotDiscartedRE += 8;
                    }
                    break;
                }

                this.totalScore.rightEye += scoreRightEye;


                let scoreLeftEye: number;

                switch(answer.answerLE)
                {
                    case "0":
                    {
                        scoreLeftEye = 0;
                    }
                    break;

                    case "30":
                    {
                        scoreLeftEye = 2;
                    }
                    break;

                    case "-180":
                    {
                        scoreLeftEye = 4;
                    }
                    break;

                    case "+180":
                    {
                        scoreLeftEye = 8;
                    }
                    break;

                    default: //caso o usuário não tenha respondido a questão com alguma das alternativas
                    {
                        this.totalScore.riskNotDiscartedLE += 8;
                    }
                    break;
                }

                this.totalScore.leftEye += scoreLeftEye;

                console.log("score após FR05: ", this.totalScore);
            }
            else {
                console.log("FR-05 not answered");
            }

            resolve();
        });
    });
  }
  
  private calculateFR06(evaluation: Evaluation) : Promise<any> {
    let answer: Answer = new Answer("FR-06");

    return new Promise((resolve, reject) => {

        this.evaluationService.getAnswer(evaluation, answer)
        .subscribe((savedAnswer: Answer) => {
            if (savedAnswer) {
                answer = savedAnswer;

                console.log("calculating FR-06", answer);

                let scoreRightEye: number;

                switch(answer.answerRE)
                {
                    case "0":
                    {
                        scoreRightEye = 0;
                    }
                    break;

                    case "-5":
                    {
                        scoreRightEye = 4;
                    }
                    break;

                    case "+5":
                    {
                        scoreRightEye = 8;
                    }
                    break;

                    default: //caso o usuário não tenha respondido a questão com alguma das alternativas
                    {
                        this.totalScore.riskNotDiscartedRE += 8;
                    }
                    break;
                }

                this.totalScore.rightEye += scoreRightEye;


                let scoreLeftEye: number;

                switch(answer.answerLE)
                {
                    case "0":
                    {
                        scoreLeftEye = 0;
                    }
                    break;

                    case "-5":
                    {
                        scoreLeftEye = 4;
                    }
                    break;

                    case "+5":
                    {
                        scoreLeftEye = 8;
                    }
                    break;

                    default: //caso o usuário não tenha respondido a questão com alguma das alternativas
                    {
                        this.totalScore.riskNotDiscartedLE += 8;
                    }
                    break;
                }

                this.totalScore.leftEye += scoreLeftEye;

                console.log("score após FR06: ", this.totalScore);
            }
            else {
                console.log("FR-06 not answered");
            }

            resolve();
        });
    });
  }
  
  private calculateFR07(evaluation: Evaluation) : Promise<any> {
    let answer: Answer = new Answer("FR-07");

    return new Promise((resolve, reject) => {
            
        this.evaluationService.getAnswer(evaluation, answer)
        .subscribe((savedAnswer: Answer) => {
            if (savedAnswer) {
                answer = savedAnswer;

                console.log("calculating FR-07", answer);
                
                let score: number = 0;

                if (typeof answer.answerA === "undefined") 
                {
                    if (typeof answer.answerB === "undefined") 
                    {
                        this.totalScore.riskNotDiscartedRE += 8;
                        this.totalScore.riskNotDiscartedLE += 8;
                    }
                    else
                    {
                        if (answer.answerB == "2")
                        {
                            score = 15;
                        }
                        else //3
                        {
                            score = 16;
                        }
                    }
                }
                else    
                {
                    score = 14;
                }

                this.totalScore.rightEye += score;
                this.totalScore.leftEye += score;

                console.log("score após FR07: ", this.totalScore);
            }
            else {
                console.log("FR-07 not answered");
            }

            resolve();
        });
    });
  }
  
  private calculateFR08(evaluation: Evaluation) : Promise<any> {
    let answer: Answer = new Answer("FR-08");

    /*
    A   DM > 15 anos	2
    B   DM > 30 anos	3
    C   DM > 15 anos & FR8 HcA1 > 8% no último ano	4
    D   HcA1 > 8% no último ano	2
    E   HcA1 > 9% no último ano	4
    F   Com complicação vascular periférica	4
    G   Com complicação renal ou coronária ou retiniana	5
    H   Com todas as complicações acima	6
    I DM > 30 anos ou FR8 HcA1 > 9% U ano + QQ compl ac	8

    1º grupo, A e B: só é possível uma opção;
    2º grupo, C e D e E: só é possível uma opção;
    3º grupo, F e G e H: só é possível uma opção;
    4º grupo, I: exclui as demais opções e não se soma com outra;
II     -      combinação entre subgrupos
A ou B podem combinar com D ou com E, com F e com G. B combina também com H, só que neste caso, use uma equação para que o valor máximo seja 8, pois o máximo no FR08 é 08. Utilizemos a mesma solução para o total do FR Não Descartado.
D ou E podem combinar com F ou G ou H. Quando E combinar com H, usamos o mesmo recurso, uma equação para que o valor máximo seja 8, pois o máximo no FR08 é 08. Utilizemos a mesma solução para o total do FR Não Descartado.
I não combina com nenhum. Sugestão: quando ele for marcado, uma pop-up poderia aparecer avisando: a marcação deste item desmarcará automaticamente os demais.
     */
    return new Promise((resolve, reject) => {
            
        this.evaluationService.getAnswer(evaluation, answer)
        .subscribe((savedAnswer: Answer) => {
            if (savedAnswer) {
                answer = savedAnswer;

                console.log("calculating FR-08", answer);
                
                let score: number = 0;

                if (typeof answer.answerA === "undefined" 
                    && typeof answer.answerB === "undefined"
                    && typeof answer.answerC === "undefined") 
                {
                    this.totalScore.riskNotDiscartedRE += 2;
                    this.totalScore.riskNotDiscartedLE += 2;
                } 
                else 
                {
                    switch(answer.answerA)
                    {
                        case "15":
                        {
                            score += 2;
                        }
                        break;

                        case "30":
                        {
                            score += 3;
                        }
                        break;
                    }

                    switch(answer.answerB)
                    {
                        case ">8%":
                        {
                            score += 2;
                        }
                        break;

                        case ">9%":
                        {
                            score += 4;
                        }
                        break;
                    }

                    switch(answer.answerC)
                    {
                        case "CVP":
                        {
                            score += 4;
                        }
                        break;

                        case "CCR":
                        {
                            score += 5;
                        }
                        break;

                        case "TODAS":
                        {
                            score += 6;
                        }
                        break;
                    }
                }

                if (score > 8) 
                {
                    score = 8;
                }

                this.totalScore.rightEye += score;
                this.totalScore.leftEye += score;

                console.log("score após FR08: ", this.totalScore);
            }
            else {
                console.log("FR-08 not answered");
            }

            resolve();
        });
    });
  }

  private calculateFR09(evaluation: Evaluation) : Promise<any> {
    let answer: Answer = new Answer("FR-09");

    return new Promise((resolve, reject) => {

        this.evaluationService.getAnswer(evaluation, answer)
        .subscribe((savedAnswer: Answer) => {
            if (savedAnswer) {
                answer = savedAnswer;

                console.log("calculating FR-09", answer);

                if (typeof answer.answerRE === "undefined") {
                    this.totalScore.riskNotDiscartedRE += 16;
                } else {
                    let scoreRightEye: number;
                    let answerRightEye: number = parseInt(answer.answerRE);

                    if (answerRightEye < 19)
                    {
                        scoreRightEye = 0;
                    }
                    else if (answerRightEye < 25)
                    {
                        scoreRightEye = 4;
                    }
                    else if (answerRightEye < 29)
                    {
                        scoreRightEye = 8;
                    }
                    else    
                    {
                        scoreRightEye = 16;
                    }

                    this.totalScore.rightEye += scoreRightEye;
                }

                if (typeof answer.answerLE === "undefined") {
                    this.totalScore.riskNotDiscartedLE += 16;
                } else {
                    let scoreLeftEye: number;
                    let answerLeftEye: number = parseInt(answer.answerLE);

                    if (answerLeftEye < 19)
                    {
                        scoreLeftEye = 0;
                    }
                    else if (answerLeftEye < 25)
                    {
                        scoreLeftEye = 4;
                    }
                    else if (answerLeftEye < 29)
                    {
                        scoreLeftEye = 8;
                    }
                    else    
                    {
                        scoreLeftEye = 16;
                    }

                    this.totalScore.leftEye += scoreLeftEye;
                }

                console.log("score após FR09: ", this.totalScore);
            }
            else {
                console.log("FR-09 not answered");
            }

            resolve();
        });
    });
  }
  
  private calculateFR10(evaluation: Evaluation) : Promise<any> {
    let answer: Answer = new Answer("FR-10");

    return new Promise((resolve, reject) => {

        this.evaluationService.getAnswer(evaluation, answer)
        .subscribe((savedAnswer: Answer) => {
            if (savedAnswer) {
                answer = savedAnswer;

                console.log("calculating FR-10", answer);

                if (typeof answer.answerA === "undefined" || answer.answerB === "undefined") {
                    this.totalScore.riskNotDiscartedRE += 4;
                    this.totalScore.riskNotDiscartedLE += 4;
                } else {
                    let score: number;
                    
                    //a (PAD): -50, -60, +60
                    //b (PAS): -60, -70, +70

                    if (answer.answerA == "-50" && answer.answerB == "-60") {
                        score = 8;
                    }

                    if (answer.answerA == "-50" && answer.answerB == "-70") {
                        score = 6;
                    }

                    if (answer.answerA == "-60" && answer.answerB == "-70") {
                        score = 4;
                    }

                    if (score > 0) {
                        this.totalScore.rightEye += score;
                        this.totalScore.leftEye += score;
                    }
                }

                console.log("score após FR10: ", this.totalScore);
            }
            else {
                console.log("FR-10 not answered");
            }

            resolve();
        });
    });
 }

  private calculateFR11(evaluation: Evaluation) : Promise<any> {
    let answer: Answer = new Answer("FR-11");

    return new Promise((resolve, reject) => {

        this.evaluationService.getAnswer(evaluation, answer)
        .subscribe((savedAnswer: Answer) => {
            if (savedAnswer) {
                answer = savedAnswer;

                console.log("calculating FR-11", answer);

                let score: number = 0;

                if (typeof answer.why === "undefined") 
                {
                    //a (unidades): -20, +20
                    //b (tempo): -10, -30, +30
                    
                    if (answer.answerA == "-20" && answer.answerB == "-30")
                    {
                        score = 2;
                    }

                    if (answer.answerA == "-20" && answer.answerB == "+30")
                    {
                        score = 3;
                    }

                    if (answer.answerA == "+20" && answer.answerB == "-30")
                    {
                        score = 4;
                    }

                    if (answer.answerA == "+20" && answer.answerB == "+30")
                    {
                        score = 6;
                    }
                } 
                else 
                {
                    if (answer.why == "nunca")
                    {
                        score = 0;
                    }
                    /*
                    //risco não descartado 
                    else if (answer.why == "compreensao")
                    {
                        this.totalScore.riskNotDiscartedRE += 6;
                        this.totalScore.riskNotDiscartedLE += 6;
                    }
                    */
                }

                this.totalScore.rightEye += score;
                this.totalScore.leftEye += score;

                console.log("score após FR11: ", this.totalScore);
            }
            else {
                console.log("FR-11 not answered");
            }

            resolve();
        });
    });
  }

  private calculateFR12(evaluation: Evaluation): Promise<any> {
    let answer: Answer = new Answer("FR-12");

    return new Promise((resolve, reject) => {

        this.evaluationService.getAnswer(evaluation, answer)
        .subscribe((savedAnswer: Answer) => {
            if (savedAnswer) {
                answer = savedAnswer;

                console.log("calculating FR-12", answer);

                let score: number;
                
                //a (frequência): 0, 1-3, +4
                //b (duração): -15, -30, +30

                if (answer.answerA == "0" && answer.answerB) {
                    score = 2;
                }

                if (answer.answerA == "1-3" && answer.answerB == "-15") {
                    score = -2;
                }

                if (answer.answerA == "+4" && answer.answerB == "-15") {
                    score = -4;
                }

                if (answer.answerA == "1-3" && answer.answerB == "-30") {
                    score = -4;
                }

                if (answer.answerA == "+4" && answer.answerB == "-30") {
                    score = -6;
                }

                if (answer.answerA == "1-3" && answer.answerB == "+30") {
                    score = -6;
                }

                if (answer.answerA == "+4" && answer.answerB == "+30") {
                    score = -8;
                }

                if (score) {
                    this.totalScore.rightEye += score;
                    this.totalScore.leftEye += score;
                }

                console.log("score após FR12: ", this.totalScore);
            }
            else {
                console.log("FR-12 not answered");
            }

            resolve();
        });
    });   
  }
}
