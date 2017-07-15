import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire } from "angularFire2";

@Injectable()
export class UserService {

  constructor(
    public af: AngularFire,
    public http: HttpModule
  ) {}

  create (user: User): firebase.Promise<void>{
    return this.af.database.object(`/users/${user.uid}`)
    .set(user);
  }

}
