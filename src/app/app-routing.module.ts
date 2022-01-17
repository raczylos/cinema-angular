import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { ScreeningsComponent } from './screenings/screenings.component';

const routes: Routes = [
    { path: 'movies', component: MoviesComponent },
    { path: 'screenings', component: ScreeningsComponent }
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
