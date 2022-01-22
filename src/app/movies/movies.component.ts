import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { MainService } from '../main.service';
import { FormBuilder } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { movie } from 'src/movie';

@Component({
	selector: 'app-movies',
	templateUrl: './movies.component.html',
	styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
	movies: movie[] = [];
	faTimes = faTimes;

	addMovieForm = this.formBuilder.group({
		id: '',
		title: '',
		duration: '',
		description: '',
		cast: '',
	});

	constructor(
		private movieService: MovieService,
		private formBuilder: FormBuilder,
        private mainService: MainService
	) { 
        this.mainService.movies$.subscribe(movies => {
            this.movies = movies
        })
    }
    
	ngOnInit(): void {

	}

	getMovies(): void {
		// this.movieService.getMovies().subscribe((movies) => {
		// 	this.movies = movies;
		// 	console.log(this.movies);
		// });
	}

	onSubmit(): void {
        this.mainService.addMovie(this.addMovieForm.value)
	}

	deleteMovie(movie: movie) {
        this.mainService.deleteMovie(movie)
	}
}
