import { SigninPage } from './../pages/signin/signin';
import { AuthService } from './../providers/auth.service';
import { HttpModule } from '@angular/http';
import { UserService } from './../providers/user.service';
import { SignupPage } from './../pages/signup/signup';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule, FirebaseAppConfig, FirebaseAuthConfig, AuthProviders, AuthMethods } from 'angularFire2';

const firebaseAppConfig: FirebaseAppConfig = {
    apiKey: "AIzaSyBcI2CdsLJ34JiTi_mIEP4e66X1frk4BGE",
    authDomain: "glaucoma-manager.firebaseapp.com",
    databaseURL: "https://glaucoma-manager.firebaseio.com",
    storageBucket: "glaucoma-manager.appspot.com",
    messagingSenderId: "209518446330"
};

const firebaseAuthConfig = {
    provider: AuthProviders.Custom,
    method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig, firebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage
  ],
  providers: [
    AuthService,
    StatusBar,
    SplashScreen,
    UserService,
    HttpModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
