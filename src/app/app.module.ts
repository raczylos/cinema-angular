import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ScreeningsComponent } from './screenings/screenings.component';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MoviesComponent } from './movies/movies.component';
import { MainComponent } from './main/main.component';
import { RoomsComponent } from './rooms/rooms.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MovieDetailsComponent } from './movie-details/movie-details.component';






@NgModule({
    declarations: [
        AppComponent,
        ScreeningsComponent,
        MoviesComponent,
        MainComponent,
        RoomsComponent,
        MovieDetailsComponent,
        
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
