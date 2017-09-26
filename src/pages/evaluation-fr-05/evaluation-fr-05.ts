import { ModalIntroFr5Page } from './../modal-intro-fr-05/modal-intro-fr-05';
import { EvaluationFR6Page } from './../evaluation-fr-06/evaluation-fr-06';
import { AuthService } from './../../providers/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms/';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-evaluation-fr-05',
  templateUrl: 'evaluation-fr-05.html',
})
export class EvaluationFR5Page {

  evaluationForm: FormGroup;
  answeredOD: boolean = false;
  answeredOE: boolean = false;

  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController, 
    public navCtrl: NavController
  ) {
        this.evaluationForm = this.formBuilder.group({
          why: '',      
          riskFactorOD: '',
          riskFactorOE: ''
        }, {validator: this.checkFields()});
  }

  checkFields(){
    return (group: FormGroup): {[key: string]: any} => {
        if (group.controls['riskFactorOD'].value && group.controls['riskFactorOE'].value) {
          return null;
        }
        else if (group.controls['why'].value) {
          return null;        
        }
        else {
          return {"nada preenchido": false};
        }
    }
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true, 'user-menu');    

    let introModal = this.modalCtrl.create(ModalIntroFr5Page);
    
    introModal.present();
  }

  ionViewCanEnter(): Promise<boolean> {    
      return this.authService.authenticated;
  }

  onSubmit(): void {
    let evaluationForm = this.evaluationForm.value;
    
    let fr03OD = evaluationForm.riskFactorOD;
    let fr03OE = evaluationForm.riskFactorOE;
    let why = evaluationForm.why;

    ///TODO: Salvar a resposta no BD
    
    if (!why) {
      this.navCtrl.push(EvaluationFR6Page);
    } else {
      this.navCtrl.push(EvaluationFR5Page, { destinationPage: EvaluationFR6Page, FR: 5 });      
    }
  }

  answerOD(){
    this.answeredOD = true;
  }

  answerOE(){
    this.answeredOE = true;
  }
}
