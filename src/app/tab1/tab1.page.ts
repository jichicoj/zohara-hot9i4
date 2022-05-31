import {Component, OnInit, ViewChild} from '@angular/core';
import {MovieService} from '../services/movie.service';
import {Storage} from '@ionic/storage-angular';
import jwt_decode from 'jwt-decode';
import {Platform} from '@ionic/angular';
import {Movie} from '../models/movie';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {AlertService} from "../services/alert.service";
import {DataService} from "../services/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  stg: Storage;
  movies = [];
  sct = '';
  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;

  constructor(
    private platform: Platform,
    private movieService: MovieService,
    private alertService: AlertService,
    private dataService: DataService,
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
    this.movieService.getMovies(id).subscribe(mvs => {
        this.movies = mvs.map(movie => {
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
    console.log(this.movies)
  }

  scrollToMovie() {
    const temp = this.movies.find(movie => {
      return movie.title.toLowerCase().includes(this.sct.toLowerCase())
    })
    console.log(temp);

    const index = this.movies.indexOf(temp);
    console.log(index)

    if (index === -1) {
      this.alertService.showAlert('Película no encontrada', null,
        null, ['Entendido']);
    }

    this.viewPort.scrollToIndex(index - 6, 'smooth')
  }

  goToMovie(movieId) {
    this.dataService.nextMovieId(movieId)
  }

}
