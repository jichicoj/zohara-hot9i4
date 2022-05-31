import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
import {MoviePage} from "../pages/movie/movie/movie.page";

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'movie',
    component: MoviePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
