import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoviePageRoutingModule } from './movie-routing.module';

import { MoviePage } from './movie.page';
import {HeaderDirective} from "../../../directives/header.directive";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoviePageRoutingModule
  ],
  declarations: [MoviePage, HeaderDirective]
})
export class MoviePageModule {}
