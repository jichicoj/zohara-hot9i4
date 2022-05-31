import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {User} from '../../../models/user';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {AlertService} from '../../../services/alert.service';
import {Storage} from '@ionic/storage-angular';

const validatePassword: ValidatorFn = (fGroup: FormGroup) => {
  const pass = fGroup.get('password').value;
  const pass2Conf = fGroup.get('confirmPassword').value;

  return pass2Conf === pass ? null : {equals: true};
};

@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
})
export class SingupPage implements OnInit {
  stg: Storage;
  signUpForm: FormGroup;
  validationMessages = {
    name: [
      {type: 'required', message: 'Es obligatorio ingresar el nombre.'},
      {type: 'pattern', message: 'El nombre ingresado contiene caracteres invválidos.'}
    ],
    email: [
      {type: 'required', message: 'Es obligatorio ingresar un correo electrónico'},
      {type: 'email', message: 'El correo electrónico ingresado no es válido.'}
    ],
    password: [
      {type: 'required', message: 'Es obligatorio ingresar una contraseña.'},
      {type: 'minlength', message: 'La contraseña debe contener al menos 8 caracteres.'}
    ],
    confirmPassword: [
      {type: 'required', message: 'Es obligatorio confirmar la contraseña.'}
    ],
  };

  private user: User;

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
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ_ ]+$')])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmPassword: ['', Validators.compose([Validators.required])]
    }, {validator: validatePassword});
  }

  signUP() {
    this.user = new User('', this.signUpForm.controls.name.value, this.signUpForm.controls.email.value,
      this.signUpForm.controls.password.value);

    this.authService.singup(this.user).subscribe(
      usr => {
        // eslint-disable-next-line no-underscore-dangle
        this.authService.login(this.user._email, this.user._password).subscribe(
          loggedInUser => {
            this.storage.set('USER', loggedInUser).then(response => {
              if (response) {
                this.authService.loggedId().then(() => console.log('successfully logged in'));
              }
            });
          },
          error => {
            const message = error.status === 404 ? 'Correo o contraseña incorrectos.' :
              'Ocurrió un error interno. Intente más tarde.';
            this.alertService.showAlert('Algo salió mal', 'Inicio de sesión fallido',
              message, ['Entendido']);
          },
          () => {
            this.router.navigate(['/tabs']);
          }
        );
      },
      error => {
        const message = error.status === 404 ? 'El correo con el que intenta ingresar ya se encuentra registrado.' :
          'Ocurrió un error interno. Intente más tarde.';

        this.alertService.showAlert('Algo salió mal', 'Inicio de sesión fallido',
          message, ['Entendido']);
      }
    );
  }
}
