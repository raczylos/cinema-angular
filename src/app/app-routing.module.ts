import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { ScreeningsComponent } from './screenings/screenings.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { ScreeningDetailsComponent } from './screening-details/screening-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'movies', component: MoviesComponent },
  { path: 'screenings', component: ScreeningsComponent },
  { path: 'screenings/:id', component: ScreeningDetailsComponent },
  { path: 'movies/:id', component: MovieDetailsComponent },
  { path: 'error404', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
