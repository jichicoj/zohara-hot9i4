import { Injectable } from '@angular/core';
import {AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController: AlertController
  ) { }

  async showAlert(thyHeader: string, thySubheader: string, thyMessage: string, thyButtons: [string]) {
    const alert = await this.alertController.create({
      header: thyHeader,
      subHeader: thySubheader,
      message: thyMessage,
      buttons: thyButtons,
      mode: 'ios'
    });

    await alert.present();
  }
}
