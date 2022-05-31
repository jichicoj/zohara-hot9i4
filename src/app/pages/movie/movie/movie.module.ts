import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoviePageRoutingModule } from './movie-routing.module';

import { MoviePage } from './movie.page';
import {HeaderDirective} from "../../../directives/header.directive";
import {SharedDirectivesModule} from "../../../directives/shared-directives.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoviePageRoutingModule,
    SharedDirectivesModule
  ],
  declarations: [MoviePage]
})
export class MoviePageModule {}
