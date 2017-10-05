import { EvaluationService } from './../providers/evaluation.service';
import { AnswerConfirmationPage } from './../pages/answer-confirmation/answer-confirmation';
import { ModalIntroFr12Page } from './../pages/modal-intro-fr-12/modal-intro-fr-12';
import { ModalIntroFr11Page } from './../pages/modal-intro-fr-11/modal-intro-fr-11';
import { ModalIntroFr10Page } from './../pages/modal-intro-fr-10/modal-intro-fr-10';
import { ModalIntroFr8Page } from './../pages/modal-intro-fr-08/modal-intro-fr-08';
import { ModalIntroFr6Page } from './../pages/modal-intro-fr-06/modal-intro-fr-06';
import { ModalIntroFr5Page } from './../pages/modal-intro-fr-05/modal-intro-fr-05';
import { ModalIntroFr4Page } from './../pages/modal-intro-fr-04/modal-intro-fr-04';
import { EvaluationFRWhyPage } from './../pages/evaluation-fr-why/evaluation-fr-why';
import { ModalIntroFr3Page } from './../pages/modal-intro-fr-03/modal-intro-fr-03';
import { ModalIntroFr2Page } from './../pages/modal-intro-fr-02/modal-intro-fr-02';
import { EvaluationFR12Page } from './../pages/evaluation-fr-12/evaluation-fr-12';
import { EvaluationFR11Page } from './../pages/evaluation-fr-11/evaluation-fr-11';
import { EvaluationFR10Page } from './../pages/evaluation-fr-10/evaluation-fr-10';
import { EvaluationFR8Page } from './../pages/evaluation-fr-08/evaluation-fr-08';
import { EvaluationFR7Page } from './../pages/evaluation-fr-07/evaluation-fr-07';
import { EvaluationFR6Page } from './../pages/evaluation-fr-06/evaluation-fr-06';
import { EvaluationFR3Page } from './../pages/evaluation-fr-03/evaluation-fr-03';
import { EvaluationFR2Page } from './../pages/evaluation-fr-02/evaluation-fr-02';
import { EvaluationPage } from './../pages/evaluation/evaluation';
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
import { EvaluationFR4Page } from "../pages/evaluation-fr-04/evaluation-fr-04";
import { EvaluationFR5Page } from "../pages/evaluation-fr-05/evaluation-fr-05";
import { EvaluationFR9Page } from "../pages/evaluation-fr-09/evaluation-fr-09";
import { ModalIntroFr7Page } from '../pages/modal-intro-fr-07/modal-intro-fr-07';
import { ModalIntroFr9Page } from '../pages/modal-intro-fr-09/modal-intro-fr-09';

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
    AnswerConfirmationPage,
    CustomLoggedHeaderComponent,
    EvaluationPage,
    EvaluationFR2Page,
    EvaluationFR3Page,
    EvaluationFR4Page,
    EvaluationFR5Page,
    EvaluationFR6Page,
    EvaluationFR7Page,
    EvaluationFR8Page,
    EvaluationFR9Page,
    EvaluationFR10Page,
    EvaluationFR11Page,
    EvaluationFR12Page,
    EvaluationFRWhyPage,
    MyApp,
    HomePage,
    ModalAgreementPage,
    ModalIntroFr2Page,
    ModalIntroFr3Page,
    ModalIntroFr4Page,
    ModalIntroFr5Page,
    ModalIntroFr6Page,
    ModalIntroFr7Page,
    ModalIntroFr8Page,
    ModalIntroFr9Page,
    ModalIntroFr10Page,
    ModalIntroFr11Page,
    ModalIntroFr12Page,
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
    AnswerConfirmationPage,
    CustomLoggedHeaderComponent,
    EvaluationPage,    
    EvaluationFR2Page,
    EvaluationFR3Page,
    EvaluationFR4Page,
    EvaluationFR5Page,
    EvaluationFR6Page,
    EvaluationFR7Page,
    EvaluationFR8Page,
    EvaluationFR9Page,
    EvaluationFR10Page,
    EvaluationFR11Page,
    EvaluationFR12Page,
    EvaluationFRWhyPage,
    MyApp,
    HomePage,
    ModalAgreementPage,
    ModalIntroFr2Page,
    ModalIntroFr3Page,
    ModalIntroFr4Page,
    ModalIntroFr5Page,
    ModalIntroFr6Page,
    ModalIntroFr7Page,
    ModalIntroFr8Page,
    ModalIntroFr9Page,
    ModalIntroFr10Page,
    ModalIntroFr11Page,
    ModalIntroFr12Page,
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
    EvaluationService,
    StatusBar,
    SplashScreen,
    UserService,
    HttpModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
