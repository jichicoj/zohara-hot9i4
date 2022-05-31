import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {PersonService} from '../../services/person.service';
import {AlertService} from '../../services/alert.service';
import {Movie} from "../../models/movie";


@Component({
  selector: 'app-person',
  templateUrl: './person.page.html',
  styleUrls: ['./person.page.scss'],
})
export class PersonPage implements OnInit {

  personId = '';
  userId = '';
  // person = new Person;
  similarPeople = [];
  options = {
    slidesPreview: 2.4,
    centeredSlides: true,
    loop: true,
    spaceBetween: 10
  };
  constructor(
    private dataService: DataService,
    private personService: PersonService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.dataService.sharedPersonId.subscribe(pId => {
      this.personId = pId;
    });
    this.dataService.sharedUserId.subscribe(uId => {
      this.userId = uId;
    });
    this.getPeople();
    //this.getSimilar();
  }

  async getPeople() {
    await this.personService.getPersonById(this.personId, this.userId).subscribe(
      mv => {
        console.log(mv);
        /*this.movie = new Movie(mv.movie.actors, mv.movie.budget, mv.movie.genres, mv.movie.directors, mv.movie.countries,
          mv.movie.favorite, mv.movie.imdbId, mv.movie.imdbRating, mv.movie.imdbVotes, mv.movie.languages,
          mv.movie.movieId, mv.movie.plot, mv.movie.poster, mv.movie.released, mv.movie.revenue, mv.movie.runtime,
          mv.movie.title, mv.movie.tmdbId, mv.movie.url, mv.movie.year);*/
      }, error => {
        console.log(error);
        this.alertService.showAlert('¡Oh, no!', 'Se ha producido un error',
          error.message, ['Entendido']);
      });
  }

/*  async getSimilar() {
    await this.movieService.getSimilarById(this.movieId, this.userId).subscribe(
      mvs => {
        this.similarMovies = mvs.map(movie => {
          movie = new Movie(movie.actors, movie.budget, movie.genres, movie.directors, movie.countries, movie.favorite,
            movie.imdbId, movie.imdbRating, movie.imdbVotes, movie.languages,movie.movieId, movie.plot, movie.poster,
            movie.released, movie.revenue, movie.runtime, movie.title, movie.tmdbId, movie.url, movie.year);

          return movie;
        });
        console.log(this.similarMovies);
      }, error => {
        console.log(error);
        this.alertService.showAlert('¡Oh, no!', 'Se ha producido un error',
          error.message, ['Entendido']);
      });
  }*/
}
