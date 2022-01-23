import { Component, OnInit, Input, ModuleWithProviders , EventEmitter, NgModule} from '@angular/core';
import { MovieService } from '../movie.service';
import { movie } from 'src/movie';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MainService } from '../main.service';

import { Router } from '@angular/router';

import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
    movie: movie | undefined
    faTimes = faTimes;


    updateMovieForm = this.formBuilder.group({
        id: '',
        title: '',
        duration: '',
        description: '',
        cast: ''
      })

  constructor(
      private route: ActivatedRoute,
      private location: Location,
      private movieService: MovieService,
      private mainService: MainService,
      private formBuilder: FormBuilder,
      private router: Router
  ) { 
      mainService.updatedMovie$.subscribe(movie => {
          this.movie = movie
      })
  }

  ngOnInit(): void {

      this.getMovie()
      this.updateMovieForm.setValue({
        id: "",
        title: this.movie!.title,
        duration: this.movie!.duration,
        description: this.movie!.description,
        cast: this.movie!.cast
    })

  }

  getMovie(): void {
    const movieId = String(this.route.snapshot.paramMap.get('id'))
    this.movie = this.mainService.getMovie(movieId)

  }

  onSubmit(): void {
    const movieId = String(this.route.snapshot.paramMap.get('id'))
    let isnum = /^\d+$/.test(this.updateMovieForm.value.duration);

    if(!this.updateMovieForm.value.title){
      alert('Please add a title!');
      return;
    }
    else if(this.updateMovieForm.value.title.length <= 1){
      alert('Name can not be less than 1 character')
      return;
    }
    else if(this.updateMovieForm.value.title.charAt(0) !== this.updateMovieForm.value.title.charAt(0).toUpperCase()){
      alert('First letter needs to be in upper case or a number.')
      return;
    }
    if(!this.updateMovieForm.value.duration){
      alert('Please add a duration!');
      return;
    }
    if(!isnum){
      alert('Duration must be a number!');
      return;
    }
    else if(this.updateMovieForm.value.duration < 30){
      alert('Duration must be more than 30')
      return;
    }
    else if(this.updateMovieForm.value.duration > 300){
      alert('Duration must be less than 300')
      return;
    }
    if(!this.updateMovieForm.value.description){
      alert('Please add a description!');
      return;
    }
    if(!this.updateMovieForm.value.cast){
      alert('Please add a cast!');
      return;
    }




    // this.movieService.updateMovie(this.updateMovieForm.value, movieId).subscribe(movie => {
    //   this.movie = movie
    // })
    this.mainService.updateMovie(this.updateMovieForm.value, movieId)
    
  }
  
}
