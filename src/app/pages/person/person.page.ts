import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {PersonService} from '../../services/person.service';
import {AlertService} from '../../services/alert.service';
import {Person} from '../../models/person';
import {Router} from "@angular/router";


@Component({
  selector: 'app-person',
  templateUrl: './person.page.html',
  styleUrls: ['./person.page.scss'],
})
export class PersonPage implements OnInit {

  personId = '';
  userId = '';
  person = new Person(0, 0, '', '', '', '', '', '', '', '', '');
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
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataService.sharedPersonId.subscribe(pId => {
      this.personId = pId;
    });
    this.dataService.sharedUserId.subscribe(uId => {
      this.userId = uId;
    });
    this.getPeople();
    this.getSimilarPeople();
  }

  async getPeople() {
    await this.personService.getPersonById(this.personId, this.userId).subscribe(
      mv => {
        console.log(mv);
        this.person = new Person(mv.actedCount, mv.directedCount, mv.bio, mv.born, mv.bornIn, mv.died, mv.imdbId,
          mv.name, mv.poster, mv.tmdbId, mv.url);
      }, error => {
        console.log(error);
        this.alertService.showAlert('¡Oh, no!', 'Se ha producido un error',
          error.message, ['Entendido']);
      });
  }

async getSimilarPeople() {
    await this.personService.getPersonSimilarById(this.personId, this.userId).subscribe(
      mvs => {
        console.log(mvs)
        this.similarPeople = mvs.map(person => {
          person = new Person(person.actedCount, person.directedCount, person.bio, person.born, person.bornIn,
            person.died, person.imdbId, person.name, person.poster, person.tmdbId, person.url);
          return person;
        });
        console.log(this.similarPeople);
      }, error => {
        console.log(error);
        this.alertService.showAlert('¡Oh, no!', 'Se ha producido un error',
          error.message, ['Entendido']);
      });
  }

  goToActor(personId) {
    this.dataService.nextPersonId(personId);
    this.router.navigate([`../person/${personId}`]);
  }
}
