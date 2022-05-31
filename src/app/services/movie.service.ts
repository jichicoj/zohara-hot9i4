import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GLOBAL} from './global.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  url: string;
  thyHeaders;

  constructor(private http: HttpClient) {
    this.url = GLOBAL.URL;
    this.thyHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  }

  getMovies(id: string): Observable<any> {
    return this.http.get(this.url + 'movie/all/' + id, { headers: this.thyHeaders });
  }

  getMovieById(movieId: string, userId: string): Observable<any> {
    return this.http.get(this.url + 'movie/find/' + movieId + '/' + userId, { headers: this.thyHeaders })
  }

  getSimilarById(movieId: string, userId: string): Observable<any> {
    return this.http.get(this.url + 'movie/similar/' + movieId + '/' + userId, { headers: this.thyHeaders })
  }

  addFavorite(movieId: string, userId: string): Observable<any> {
    return this.http.post(this.url + 'account/favorite/add/' + movieId + '/' + userId, { headers: this.thyHeaders })
  }

  removeFavorite(movieId: string, userId: string): Observable<any> {
    return this.http.delete(this.url + 'account/favorite/remove/' + movieId + '/' + userId, { headers: this.thyHeaders })
  }

  findByName(name: string): Observable<any> {
    return this.http.get(this.url + 'movie/find/' + name, { headers: this.thyHeaders })
  }
}
