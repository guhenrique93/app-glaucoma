import { AuthService } from './../../providers/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms/';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-evaluation-fr-07',
  templateUrl: 'evaluation-fr-07.html',
})
export class EvaluationFR7Page {

  evaluationForm: FormGroup;
  
  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    public navCtrl: NavController
  ) {
    this.evaluationForm = this.formBuilder.group({
        riskFactorA: ['', [Validators.required]],
        riskFactorB: ['', [Validators.required]]
      });
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true, 'user-menu');    
  }

  ionViewCanEnter(): Promise<boolean> {    
      return this.authService.authenticated;
  }

  onSubmit(): void {
    let evaluationForm = this.evaluationForm.value;
    
    let fr03UmFamiliar = evaluationForm.riskFactorA;
    let fr03MaisDeUmFamiliar = evaluationForm.riskFactorB;

    ///TODO: Salvar a resposta no BD
    alert('salvando fator de risco...');
    //this.navCtrl.push();
  }
}

