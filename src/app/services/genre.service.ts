import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GLOBAL} from "./global.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  url: string;
  thyHeaders;

  constructor(private http: HttpClient) {
    this.url = GLOBAL.URL;
    this.thyHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  }

  getGenres(): Observable<any> {
    return this.http.get(this.url + 'genres/all', { headers: this.thyHeaders });
  }
}
