import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Platform} from '@ionic/angular';
import {GLOBAL} from './global.service';
import {User} from '../models/user';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string;
  thyHeaders;
  authState = new BehaviorSubject(false);
  stg: Storage;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.loggedId();
    });

    this.url = GLOBAL.URL;
    this.thyHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  }

  singup(user: User): Observable<any> {
    const params = JSON.stringify(user);
    return this.http.post(this.url + 'auth/signup', params, { headers: this.thyHeaders });
  }

  login(user, pass): Observable<any>{
    return this.http.post(this.url + 'auth/signin', {email: user, password: pass}, { headers: this.thyHeaders });
  }

  async loggedId() {
    this.stg = await this.storage.create();

    this.stg.get('USER').then(response => {
      if (response) {
        this.authState.next(true);
      }
    });
  }

  logout() {
    this.stg.remove('USER').then(() => this.authState.next(false));
  }

  isAuthenticated() {
    return this.authState.value;
  }
}
