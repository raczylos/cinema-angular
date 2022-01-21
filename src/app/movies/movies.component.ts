import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { movie } from 'src/Movie';
import { FormBuilder } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
    movies: movie[] = []
    faTimes = faTimes;

    addMovieForm = this.formBuilder.group({
        id: '',
        title: '',
        duration: '',
        description: '',
        cast: ''
    })

  constructor(
    private movieService: MovieService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getMovies()
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe(
      movies => {
        this.movies = movies
        console.log(this.movies)
      }
    )
  }


  onSubmit(): void {
    this.movieService.addMovie(this.addMovieForm.value).subscribe(movie => {
      this.movies.push(movie)
    })
    
  }

  deleteMovie(movie: movie){
    this.movieService.deleteMovie(movie).subscribe(() => (this.movies = this.movies.filter((t) => t.id !== movie.id)));
  }

}
