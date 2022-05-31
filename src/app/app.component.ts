import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './services/auth.service';
import {UserService} from './services/user.service';
import {Platform} from '@ionic/angular';
import jwt_decode from 'jwt-decode';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  name = '';
  email = '';
  stg: Storage;

  constructor(
    private platform: Platform,
    private router: Router,
    private authService: AuthService,
    private storage: Storage,
    private userService: UserService
  ) {  }

  ngOnInit(): void {
      this.initializeApp();
  }

  async initializeApp() {
    this.stg = await this.storage.create();
    this.platform.ready().then(() => {

      this.authService.authState.subscribe(state => {
        if (state) {
          let user;
          this.stg.get('USER').then(token => {
            user = jwt_decode(token.token);
            this.name = user.username;
            this.email = user.email;
          });
          this.router.navigate(['/tabs']);
        } else {
          this.router.navigate(['/login']);
        }
      });
    });
  }
}
