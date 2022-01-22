
import { AppComponent } from './app.component';
import { ScreeningsComponent } from './screenings/screenings.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { ScreeningDetailsComponent } from './screening-details/screening-details.component';
import { MoviesComponent } from './movies/movies.component';
import { MainComponent } from './main/main.component';
import { RoomsComponent } from './rooms/rooms.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { MainService } from './main.service';



@NgModule({
    declarations: [
        AppComponent,
        ScreeningsComponent,
        MoviesComponent,
        MainComponent,
        RoomsComponent,
        MovieDetailsComponent,
        MovieItemComponent,
        ScreeningDetailsComponent,
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
        FontAwesomeModule,
        MatCardModule,
        MatSelectModule
    ],
    providers: [MainService],
    bootstrap: [AppComponent]
})
export class AppModule { }
