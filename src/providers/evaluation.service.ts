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
    return  this.af.database.object(`/evaluations/${userId}/${evaluation.uid}/`)
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

  saveAnswer(evaluation: Evaluation, answer: Answer): firebase.Promise<void> {
    answer.root = "answers-" + evaluation.uid;
    return  this.af.database.object(`/answers/${answer.root}/${answer.riskFactor}/`)
      .set(answer)
      .catch(this.handlePromiseError);
  }
}
