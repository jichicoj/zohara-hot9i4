import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss()
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['./login'])
    this.dismiss()
  }

}
