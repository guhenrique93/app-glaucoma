import { AuthService } from './../../providers/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms/';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-evaluation-fr-why',
  templateUrl: 'evaluation-fr-why.html',
})
export class EvaluationFRWhyPage {
  evaluationForm: FormGroup;
  destinationPage;
  FR: number;

  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.evaluationForm = this.formBuilder.group({
        why: []
      });

     this.destinationPage = navParams.get('destinationPage'); 
     this.FR = navParams.get('FR'); 

     console.log('FR: ' + this.FR);
     
  }
  
  ionViewDidLoad() {
    this.menuCtrl.enable(true, 'user-menu');   
  }

  ionViewCanEnter(): Promise<boolean> {    
      return this.authService.authenticated;
  }

  onSubmit(): void {
    let evaluationForm = this.evaluationForm.value;
    
    let why = evaluationForm.why;

    ///TODO: Salvar a resposta no BD

    this.navCtrl.push(this.destinationPage);
  }

  voltar(): void {
    this.navCtrl.pop();
  }
}