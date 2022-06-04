import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {PersonService} from '../../services/person.service';
import {AlertService} from '../../services/alert.service';
import {Person} from '../../models/person';


@Component({
  selector: 'app-person',
  templateUrl: './person.page.html',
  styleUrls: ['./person.page.scss'],
})
export class PersonPage implements OnInit {

  personId = '';
  userId = '';
  person = new Person('', '', '', '', '', '', '', '', '');
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
    this.getSimilarPeople();
  }

  async getPeople() {
    await this.personService.getPersonById(this.personId, this.userId).subscribe(
      mv => {
        console.log(mv);
          this.person = new Person(mv.person.bio, mv.person.born, mv.person.bornIn, mv.person.died, mv.person.imdbId,
          mv.person.name, mv.person.poster, mv.person.tmdbId, mv.person.url);
      }, error => {
        console.log(error);
        this.alertService.showAlert('¡Oh, no!', 'Se ha producido un error',
          error.message, ['Entendido']);
      });
  }

async getSimilarPeople() {
    await this.personService.getPersonSimilarById(this.personId, this.userId).subscribe(
      mvs => {
        this.similarPeople = mvs.map(person => {
          person = new Person(person.bio, person.born, person.bornIn, person.died, person.imdbId,
            person.name, person.poster, person.tmdbId, person.url);;

          return person;
        });
        console.log(this.similarPeople);
      }, error => {
        console.log(error);
        this.alertService.showAlert('¡Oh, no!', 'Se ha producido un error',
          error.message, ['Entendido']);
      });
  }
}
