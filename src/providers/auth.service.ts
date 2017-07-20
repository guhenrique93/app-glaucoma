import { AngularFire, AngularFireAuth, FirebaseAuthState } from 'angularFire2';
import { Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { BaseService } from "./base.service";

@Injectable()
export class AuthService extends BaseService{

  constructor(
    public auth: AngularFireAuth,
    public http: HttpModule
  ) {
    super();
  }

  createAuthUser(user: {email: string, password: string}): firebase.Promise<FirebaseAuthState>{
    return this.auth.createUser(user)
      .catch(this.handlePromiseError);
  }

  signinWithEmail(user: {email: string, password: string}): firebase.Promise<boolean>{
    return this.auth.login(user)
      .then((authState: FirebaseAuthState) => {
          return authState != null;
      }).catch(this.handlePromiseError);
  }

  logout(): Promise<void> {
    return this.auth.logout();
  }

  get authenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.auth
        .first()
        .subscribe((authState: FirebaseAuthState) => {
          (authState) ? resolve(true) : reject(false);
        })
    })
  }
}
