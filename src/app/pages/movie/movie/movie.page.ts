import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../services/data.service';
import {MovieService} from '../../../services/movie.service';
import {Movie} from '../../../models/movie';
import {AlertService} from '../../../services/alert.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {

  movieId = '';
  userId = '';
  icon = 'heart-circle-outline';
  movie = new Movie('','', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  similarMovies = [];
  options = {
    slidesPreview: 2.4,
    centeredSlides: true,
    loop: true,
    spaceBetween: 10
  };
  colors = ['primary', 'secondary', 'tertiary', 'success', 'danger', 'warning']
  i = 0

  constructor(
    private dataService: DataService,
    private movieService: MovieService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataService.sharedMovieId.subscribe(mId => {
      this.movieId = mId;
    });
    this.dataService.sharedUserId.subscribe(uId => {
      this.userId = uId;
    });
    this.getMovie();
    this.getSimilar();
  }

  async getMovie() {
    await this.movieService.getMovieById(this.movieId, this.userId).subscribe(
      mv => {
        console.log(mv);
          this.movie = new Movie(mv.movie.actors, mv.movie.budget, mv.movie.genres, mv.movie.directors, mv.movie.countries,
            mv.movie.favorite, mv.movie.imdbId, mv.movie.imdbRating, mv.movie.imdbVotes, mv.movie.languages,
            mv.movie.movieId, mv.movie.plot, mv.movie.poster, mv.movie.released, mv.movie.revenue, mv.movie.runtime,
            mv.movie.title, mv.movie.tmdbId, mv.movie.url, mv.movie.year);
      }, error => {
        console.log(error);
        this.alertService.showAlert('¡Oh, no!', 'Se ha producido un error',
          error.message, ['Entendido']);
      });
  }

  async getSimilar() {
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
  }

  fav(isFavorite) {
    if (isFavorite === false) {
      this.movieService.addFavorite(this.movieId, this.userId).subscribe(response => {
        console.log(response);
        this.movie.favorite = true;
      }, error => {
        console.log(error);
        this.alertService.showAlert('¡Oh, no!', 'Se ha producido un error',
          error.error, ['Entendido']);
      });
    } else {
      this.movieService.removeFavorite(this.movieId, this.userId).subscribe(response => {
        this.movie.favorite = false;
        console.log(response);
      }, error => {
        console.log(error);
        this.alertService.showAlert('¡Oh, no!', 'Se ha producido un error',
          error.error, ['Entendido']);
      });
    }
  }

  goToPerson(personId) {
    this.dataService.nextPersonId(personId)
    this.router.navigate([`../person/${personId}`])
  }

  goToSimilarMovie(movieId) {
    this.dataService.nextMovieId(movieId)
    this.router.navigate([`../movie/${movieId}`])
  }
}
