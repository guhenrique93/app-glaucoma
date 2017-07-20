import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire } from "angularFire2";
import { BaseService } from "./base.service";
import { Observable } from "rxjs/Rx";

@Injectable()
export class UserService extends BaseService{

  constructor(
    public af: AngularFire,
    public http: HttpModule
  ) {
    super();
  }

  create (user: User): firebase.Promise<void>{
    return this.af.database.object(`/users/${user.uid}`)
    .set(user)
    .catch(this.handlePromiseError);
  }

  userExists(username: string): Observable<boolean> {
    return this.af.database.list(`/users`, { 
      query: {
        orderByChild: 'username',
        equalTo: username
      }
    }).map((users: User[]) => {
      return users.length > 0
    }).catch(this.handleObservableError);
  }
}
