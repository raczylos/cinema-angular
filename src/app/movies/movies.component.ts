import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { movie } from 'src/Movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
    movies: movie[] = []

  constructor(private movieService: MovieService) { }

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

}
