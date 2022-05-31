import {Component, OnInit, ViewChild} from '@angular/core';
import {MovieService} from '../services/movie.service';
import {Storage} from '@ionic/storage-angular';
import jwt_decode from 'jwt-decode';
import {Platform} from '@ionic/angular';
import {Movie} from '../models/movie';
import {AlertService} from "../services/alert.service";
import {DataService} from "../services/data.service";
import {GenreService} from "../services/genre.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  stg: Storage;
  movie = new Movie('','', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '')
  favorites = []
  gnres = [{
    name: '',
    movies: []
  }]
  options = {
    slidesPreview: 2.4,
    centeredSlides: true,
    freeMode: true,
    spaceBetween: 5
  }

  constructor(
    private platform: Platform,
    private movieService: MovieService,
    private alertService: AlertService,
    private dataService: DataService,
    private genreService: GenreService,
    private userService: UserService,
    private storage: Storage,
    private router: Router
  ) { }

  async init() {
    this.stg = await this.storage.create();
    this.platform.ready().then(() => {
      let user;
      this.stg.get('USER').then(result => {
        user = jwt_decode(result.token);
        this.dataService.nextUserId(user.id)
        this.getMovies(user.id);
      });
    });
  }

  getMovies(id) {
    this.movieService.getMovies(id).subscribe(mv => {
      console.log(mv)
        this.movie = new Movie(mv.movie.actors, mv.movie.budget, mv.movie.genres, mv.movie.directors, mv.movie.countries, mv.movie.favorite,
          mv.movie.imdbId, mv.movie.imdbRating, mv.movie.imdbVotes, mv.movie.languages,mv.movie.movieId, mv.movie.plot, mv.movie.poster,
          mv.movie.released, mv.movie.revenue, mv.movie.runtime, mv.movie.title, mv.movie.tmdbId, mv.movie.url, mv.movie.year);

        this.favorites = mv.favorites.map(movie => {
          movie = new Movie(movie.actors, movie.budget, movie.genres, movie.directors, movie.countries, movie.favorite,
            movie.imdbId, movie.imdbRating, movie.imdbVotes, movie.languages,movie.movieId, movie.plot, movie.poster,
            movie.released, movie.revenue, movie.runtime, movie.title, movie.tmdbId, movie.url, movie.year);

          return movie
        });
      },
      error => {
        this.alertService.showAlert('¡Oh, no!', 'Se ha producido un error',
          error.error, ['Entendido']);
      });
  }

  ngOnInit(): void {
    this.init();

    this.genreService.getGenres().subscribe(response => {
      response.map(item => {
        const temp = this.gnres.find(data => {
          return data.name.includes(item.name)
        })

        if (temp === undefined) {
          this.gnres.push({name: item.name, movies: [item.movies]})
        } else {
          const index = this.gnres.indexOf(temp);
          this.gnres[index].movies.push(item.movies)
        }
      })
      this.gnres.shift()
    }, error => {
      console.log(error)
      this.alertService.showAlert('¡Oh, no!', 'Se ha producido un error',
        error.message, ['Entendido']);
    })
  }

  goToMovie(movieId) {
    this.dataService.nextMovieId(movieId)
    this.router.navigate(['/movie'])
  }

}
