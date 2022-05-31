import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GLOBAL} from './global.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  url: string;
  thyHeaders;

  constructor(private http: HttpClient) {
    this.url = GLOBAL.URL;
    this.thyHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  }

  getPersonById(personId: string, userId: string): Observable<any> {
    return this.http.get(this.url + 'people/find/' + personId + '/' + userId, { headers: this.thyHeaders });
  }

  getPersonSimilarById(personId: string, userId: string): Observable<any> {
    return this.http.get(this.url + 'people/similar/' + personId + '/' + userId, { headers: this.thyHeaders });
  }

  findPersonByName(name: string): Observable<any> {
    return this.http.get(this.url + 'people/find/' + name, { headers: this.thyHeaders });
  }
}
