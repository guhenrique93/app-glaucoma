import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule, FirebaseAppConfig } from 'angularFire2';

const firebaseAppConfig: FirebaseAppConfig = {
    apiKey: "AIzaSyBcI2CdsLJ34JiTi_mIEP4e66X1frk4BGE",
    authDomain: "glaucoma-manager.firebaseapp.com",
    databaseURL: "https://glaucoma-manager.firebaseio.com",
    storageBucket: "glaucoma-manager.appspot.com",
    messagingSenderId: "209518446330"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
