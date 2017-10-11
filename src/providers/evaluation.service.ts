import { Observable } from 'rxjs/Rx';
import { FirebaseObjectObservable } from 'angularFire2';
import { AngularFire } from 'angularFire2';
import { Evaluation } from './../models/evaluation.model';
import { Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
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

  getEvaluations(userId: string): FirebaseObjectObservable<Evaluation> {
    return <FirebaseObjectObservable<Evaluation>>this.af.database.object(`/evaluations/${userId}`)
      .catch(this.handlePromiseError);
  }

  getCurrentEvaluation(userId: string): any {
    console.log("Teste");
    return this.af.database.list(`/evaluations/${userId}`, { 
      query: {
        orderByChild: 'finished',
        equalTo: false
      }
    }).catch(this.handleObservableError);
    /*.map((evaluations: Evaluation[]) => {
      console.log("map" + evaluations);
      return evaluations[0];
    })*/
    
  }

  evaluationStartedNotFinished(userId: string): Observable<boolean> {
    return this.af.database.list(`/evaluations/${userId}`, { 
      query: {
        orderByChild: 'finished',
        equalTo: false
      }
    }).map((evaluations: Evaluation[]) => {
      return evaluations.length > 0
    }).catch(this.handleObservableError);
  }
}
