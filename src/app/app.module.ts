import { ModalAgreementPage } from './../pages/modal-agreement/modal-agreement';
import { SignupPasswordPage } from './../pages/signup-password/signup-password';
import { SignupAgreementPage } from './../pages/signup-agreement/signup-agreement';
import { SignupScholarityPage } from './../pages/signup-scholarity/signup-scholarity';
import { SignupResidenceplacePage } from './../pages/signup-residenceplace/signup-residenceplace';
import { SignupGenderPage } from './../pages/signup-gender/signup-gender';
import { SignupBirthdayPage } from './../pages/signup-birthday/signup-birthday';
import { SignupNamePage } from './../pages/signup-name/signup-name';
import { SignupEmailPage } from './../pages/signup-email/signup-email';
import { UserProfilePage } from './../pages/user-profile/user-profile';
import { UserMenuComponent } from './../components/user-menu/user-menu.component';
import { UserInfoComponent } from './../components/user-info/user-info.component';
import { CustomLoggedHeaderComponent } from './../components/custom-logged-header/custom-logged-header.component';
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
import { SignupBirthplacePage } from "../pages/signup-birthplace/signup-birthplace";

const firebaseAppConfig = {
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
    CustomLoggedHeaderComponent,
    MyApp,
    HomePage,
    ModalAgreementPage,
    SigninPage,
    SignupPage,
    SignupAgreementPage,
    SignupBirthdayPage,
    SignupBirthplacePage,
    SignupEmailPage,
    SignupGenderPage,
    SignupNamePage,
    SignupPasswordPage,
    SignupResidenceplacePage,
    SignupScholarityPage,
    UserInfoComponent,
    UserMenuComponent,
    UserProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig, firebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CustomLoggedHeaderComponent,
    MyApp,
    HomePage,
    ModalAgreementPage,
    SigninPage,
    SignupPage,
    SignupAgreementPage,
    SignupBirthdayPage,
    SignupBirthplacePage,
    SignupEmailPage,
    SignupGenderPage,
    SignupNamePage,
    SignupPasswordPage,
    SignupResidenceplacePage,
    SignupScholarityPage,
    UserInfoComponent,
    UserMenuComponent,
    UserProfilePage
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
