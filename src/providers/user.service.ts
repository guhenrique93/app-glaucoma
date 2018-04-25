import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseObjectObservable, FirebaseAuthState } from "angularFire2";
import { BaseService } from "./base.service";
import { Observable } from "rxjs/Rx";

@Injectable()
export class UserService extends BaseService{

  currentUser: FirebaseObjectObservable<User>;

  constructor(
    public af: AngularFire,
    public http: HttpModule
  ) {
    super();

    this.listenAuthState();
  }

  private listenAuthState(): void {
    this.af.auth
      .subscribe((authState: FirebaseAuthState) => {
        if (authState) {
          this.currentUser = this.af.database.object(`/users/${authState.auth.uid}`);
        }
      })
  }

  create(user: User): firebase.Promise<void>{
    return this.af.database.object(`/users/${user.uid}`)
    .set(user)
    .catch(this.handlePromiseError);
  }

  edit(user: {name: string, birthday: Date, residencePlace: string})
    : firebase.Promise<void> {
    return this.currentUser
      .update(user)
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

  getAge(userID: string): Observable<number> {
    return this.af.database.list(`/users`, { 
      preserveSnapshot: true,
      query: {
        orderByChild: 'uid',
        equalTo: userID,
        limitToFirst: 1
      }
    })
    .map(snapshots => {
      let user = snapshots[0].val() as User;

      var today = new Date();
      var birthDate = new Date(user.birthday);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
      {
          age--;
      }
      return age;
    })
    .catch(this.handleObservableError);
  }

}
