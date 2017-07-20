import { AngularFire, AngularFireAuth, FirebaseAuthState } from 'angularFire2';
import { Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
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
}
