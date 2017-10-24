import { Answer } from './../models/answer.model';
import { Observable } from 'rxjs/Rx';
import { FirebaseObjectObservable } from 'angularFire2';
import { AngularFire } from 'angularFire2';
import { Evaluation } from './../models/evaluation.model';
import { Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';

import { BaseService } from './base.service';

@Injectable()
export class EvaluationService extends BaseService {

  constructor(
    public af: AngularFire,
    public http: HttpModule
  ) {
      super();
  }

  create(evaluation: Evaluation, userId: string): firebase.Promise<void> {
    evaluation.uid = "evaluation-" + Date.now();
    evaluation.root = `/evaluations/${userId}/${evaluation.uid}/`;
    
    return  this.af.database.object(evaluation.root)
      .set(evaluation)
      .catch(this.handlePromiseError);
  }

  getEvaluations(userId: string): FirebaseObjectObservable<any> {
    return <FirebaseObjectObservable<any>>this.af.database.object(`/evaluations/${userId}`)
      .catch(this.handlePromiseError);
  }

  evaluationStartedNotFinished(userId: string): Observable<boolean> {
    return this.af.database.list(`/evaluations/${userId}`, { 
      query: {
        orderByChild: 'finished',
        equalTo: false
      }
    })
      .map((evaluations: Evaluation[]) => {
        return evaluations.length > 0
      })
      .catch(this.handleObservableError);
  }

  getCurrentEvaluation(userId: string): Observable<Evaluation> {
    return this.af.database.list(`/evaluations/${userId}`, { 
      preserveSnapshot: true,
      query: {
        orderByChild: 'finished',
        equalTo: false,
        limitToFirst: 1
      }
    })
      .map(snapshots => {
        return snapshots[0].val() as Evaluation;
      })
      .catch(this.handleObservableError);
  }

  finishEvaluation(evaluation: Evaluation): firebase.Promise<void> {
    evaluation.finished = true;
    
    return  this.af.database.object(evaluation.root)
      .set(evaluation)
      .catch(this.handlePromiseError);
  }

  saveAnswer(evaluation: Evaluation, answer: Answer): firebase.Promise<void> {
    answer.root = "answers-" + evaluation.uid;
    
    return  this.af.database.object(`/answers/${answer.root}/${answer.riskFactor}/`)
      .set(answer)
      .catch(this.handlePromiseError);
  }

  questionAnswered(evaluation: Evaluation, answer: Answer): Observable<boolean> {
    answer.root = "answers-" + evaluation.uid;
    
    return this.af.database.list(`/answers/${answer.root}/`, { 
      preserveSnapshot: true,
      query: {
        orderByChild: 'riskFactor',
        equalTo: answer.riskFactor,
      }
    })
      .map((answers: Answer[]) => {
        return answers.length > 0
      })
      .catch(this.handleObservableError);
  }

  getAnswer(evaluation: Evaluation, answer: Answer): Observable<Answer> {
    answer.root = "answers-" + evaluation.uid;
    
    return this.af.database.list(`/answers/${answer.root}/`, { 
      preserveSnapshot: true,
      query: {
        orderByChild: 'riskFactor',
        equalTo: answer.riskFactor,
      }
    })
      .map(snapshots => {
        return snapshots[0].val() as Answer;
      })
      .catch(this.handleObservableError);
  }
}
