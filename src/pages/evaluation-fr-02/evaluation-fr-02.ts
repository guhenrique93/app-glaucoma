import { EvaluationFRWhyPage } from './../evaluation-fr-why/evaluation-fr-why';
import { ModalIntroFr2Page } from './../modal-intro-fr-02/modal-intro-fr-02';
import { ModalIntroPage } from './../modal-intro/modal-intro';
import { EvaluationFR3Page } from './../evaluation-fr-03/evaluation-fr-03';
import { FormBuilder, FormGroup, Validators } from '@angular/forms/';
import { AuthService } from './../../providers/auth.service';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-evaluation-fr-02',
  templateUrl: 'evaluation-fr-02.html',
})
export class EvaluationFR2Page {

  evaluationForm: FormGroup;
  evaluationForm2: FormGroup;
  incerteza: boolean = false;
  
  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController,    
    public navCtrl: NavController
  ) {
    this.evaluationForm = this.formBuilder.group({
        riskFactor: ['', [Validators.required]]
      });

    this.evaluationForm2 = this.formBuilder.group({
        why: ['', [Validators.required]]
      });
  }
  
  ionViewDidLoad() {
    this.menuCtrl.enable(true, 'user-menu');   
    
    let introModal = this.modalCtrl.create(ModalIntroFr2Page);
    
    introModal.present();
  }

  ionViewCanEnter(): Promise<boolean> {    
      return this.authService.authenticated;
  }

  onSubmit(): void {
    let evaluationForm = this.evaluationForm.value;
    
    let fr02 = evaluationForm.riskFactor;

    ///TODO: Salvar a resposta no BD

    if (fr02 == 'incerteza'){
      this.incerteza = true;  
    }
    else {
      this.navCtrl.push(EvaluationFR3Page);
    }
  }

  onSubmit2(): void {
    ///TODO: Salvar a resposta da resposta no BD
    
    this.navCtrl.push(EvaluationFRWhyPage, {destinationPage: EvaluationFR3Page, FR: 2});
  }

  voltar(): void {
    this.incerteza = false;
  }
}
