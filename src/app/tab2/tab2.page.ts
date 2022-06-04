import {Component, OnInit} from '@angular/core';
import {MovieService} from '../services/movie.service';
import {AlertService} from '../services/alert.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {Movie} from '../models/movie';
import {DataService} from '../services/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  search = '';
  movies = [];
  people = [];
  options = {
    slidesPreview: 2.4,
    centeredSlides: true,
    freeMode: true,
    spaceBetween: 5
  };
  searchField: FormControl;

  constructor(
    private movieService: MovieService,
    private alertService: AlertService,
    private dataService: DataService,
    private router: Router
  ) {
    this.searchField = new FormControl('');
  }

  async ngOnInit() {
        this.searchField.valueChanges.subscribe(value => {
          if (value.trim().length > 0) {
            this.movieService.findByName(value).subscribe(
              response => {
                console.log(response);
                this.movies = response.movies;
                this.people = response.people;
              }, error => {
                console.log(error);
                this.alertService.showAlert('¡Oh, no!', 'Se ha producido un error',
                  error.message, ['Entendido']);
              });
          }
        });
    }

  goToMovie(movieId) {
    this.dataService.nextMovieId(movieId);
    this.router.navigate(['/movie']);
  }

  goToActor(personId) {
    this.dataService.nextPersonId(personId);
    this.router.navigate(['/person']);
  }

}
