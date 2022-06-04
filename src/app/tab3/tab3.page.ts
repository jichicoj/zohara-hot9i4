import {Component, OnInit} from '@angular/core';
import {MovieService} from '../services/movie.service';
import {AlertService} from '../services/alert.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {DataService} from '../services/data.service';
import {Router} from '@angular/router';
import {User} from '../models/user';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  userId = '';
  user = new User('', '', '', '');
  options = {
    slidesPreview: 2.4,
    centeredSlides: true,
    freeMode: true,
    spaceBetween: 5
  };
  searchField: FormControl;

  constructor(
    private alertService: AlertService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataService.sharedUserId.subscribe(uId => {
      this.userId = uId;
    });
    this.showUser();
  }
  showUser(){
    console.log(this.userId);
  }
}
