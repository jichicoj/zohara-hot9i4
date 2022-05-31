import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GLOBAL} from './global.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string;
  thyHeaders;

  constructor(private http: HttpClient) {
    this.url = GLOBAL.URL;
    this.thyHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  }

  getUser(id: string): Observable<any>{
    return this.http.get(this.url + 'user/getUser/' + id, { headers: this.thyHeaders });
  }
}
