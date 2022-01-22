import { Component, OnInit, Input, ModuleWithProviders , EventEmitter} from '@angular/core';
import { MovieService } from '../movie.service';
import { movie } from 'src/movie';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MainService } from '../main.service';

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
      private formBuilder: FormBuilder
  ) { 
      mainService.updatedMovie$.subscribe(movie => {
          this.movie = movie
      })
  }

  ngOnInit(): void {
      this.getMovie()
  }

  getMovie(): void {
    const movieId = String(this.route.snapshot.paramMap.get('id'))
    this.movie = this.mainService.getMovie(movieId)
  }

  onSubmit(): void {
    const movieId = String(this.route.snapshot.paramMap.get('id'))
    // this.movieService.updateMovie(this.updateMovieForm.value, movieId).subscribe(movie => {
    //   this.movie = movie
    // })
    this.mainService.updateMovie(this.updateMovieForm.value, movieId)
    
  }
  
}
