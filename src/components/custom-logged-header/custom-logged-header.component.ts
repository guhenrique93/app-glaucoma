import { AuthService } from './../../providers/auth.service';
import { AlertController, MenuController, App } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { BaseComponent } from "../base.component";
import { NavController } from 'ionic-angular';

@Component({
  selector: 'custom-logged-header',
  templateUrl: 'custom-logged-header.component.html'
})
export class CustomLoggedHeaderComponent extends BaseComponent{

  @Input() title: string;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public app: App,
    public menuCtrl: MenuController
  ) {
    super(alertCtrl, authService, app, menuCtrl);
  }

}
