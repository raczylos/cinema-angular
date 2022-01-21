import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { movie } from 'src/Movie';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
    movie: movie | undefined


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
      private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
      this.getMovie()
  }

  getMovie(): void {
    const movieId = String(this.route.snapshot.paramMap.get('id'))
    this.movieService.getMovie(movieId).subscribe(movie => {
        this.movie = movie
        console.log(movie)
    })
  }

  onSubmit(): void {
    const movieId = String(this.route.snapshot.paramMap.get('id'))
    this.movieService.updateMovie(this.updateMovieForm.value, movieId).subscribe(movie => {
      this.movie = movie
    })
    
  }

}
