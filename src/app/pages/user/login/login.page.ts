import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {AlertService} from '../../../services/alert.service';
import {Storage} from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  stg: Storage;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    private storage: Storage
  ) {
    this.createStorage();
  }

  async createStorage() {
    this.stg = await this.storage.create();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  login() {

    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe(
      loggedInUser => {
        console.log(loggedInUser);
        this.stg.set('USER', loggedInUser).then(() => {
          this.authService.loggedId();
        });
      },
      error => {
        this.router.navigate(['/login']);
        const message = error.status === 404 ? 'Correo o contraseña incorrectos.' :
          'Ocurrió un error interno. Intente más tarde.';
        this.alertService.showAlert('Algo salió mal', 'Inicio de sesión fallido',
          message, ['Entendido']);
      },
      () => {
        this.router.navigate(['/tabs']);
      }
    );
  }

}
