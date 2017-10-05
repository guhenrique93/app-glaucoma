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
    return  this.af.database.object(`/evaluations/${userId}/evaluation-${Date.now()}/`)
      .set(evaluation)
      .catch(this.handlePromiseError);
  }

  getEvaluations(userId: string): FirebaseObjectObservable<Evaluation> {
    return <FirebaseObjectObservable<Evaluation>>this.af.database.object(`/evaluations/${userId}`)
      .catch(this.handlePromiseError);
  }
}
