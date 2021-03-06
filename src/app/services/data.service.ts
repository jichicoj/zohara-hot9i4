import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private movieId = new BehaviorSubject('')
  private userId = new BehaviorSubject('')
  private personId = new BehaviorSubject('')

  sharedMovieId = this.movieId.asObservable()
  sharedUserId = this.userId.asObservable()
  sharedPersonId = this.personId.asObservable()

  constructor() { }

  nextMovieId(movieId) {
    this.movieId.next(movieId)
  }

  nextUserId(userId) {
    this.userId.next(userId)
  }

  nextPersonId(personId) {
    this.personId.next(personId)
  }
}
