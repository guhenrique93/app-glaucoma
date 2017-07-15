import { AngularFire, AngularFireAuth, FirebaseAuthState } from 'angularFire2';
import { Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(
    public auth: AngularFireAuth,
    public http: HttpModule
  ) {
  }

  createAuthUser(user: {email: string, password: string}): firebase.Promise<FirebaseAuthState>{
    return this.auth.createUser(user);
  }
}
