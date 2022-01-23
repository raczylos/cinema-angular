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

		let isnum = /^\d+$/.test(this.addMovieForm.value.duration);

		if(!this.addMovieForm.value.title){
			alert('Please add a title!');
			return;
		  }
		  else if(this.addMovieForm.value.title.length <= 1){
			alert('Name can not be less than 1 character')
			return;
		  }
		  else if(this.addMovieForm.value.title.charAt(0) !== this.addMovieForm.value.title.charAt(0).toUpperCase()){
			alert('First letter needs to be in upper case or a number.')
			return;
		}
		if(!this.addMovieForm.value.duration){
			alert('Please add a duration!');
			return;
		}
		if(!isnum){
			alert('Duration must be a number!');
			return;
		}
		  else if(this.addMovieForm.value.duration < 30){
			alert('Duration must be more than 30')
			return;
		}
		  else if(this.addMovieForm.value.duration > 300){
			alert('Duration must be less than 300')
			return;
		}
		  if(!this.addMovieForm.value.description){
			alert('Please add a description!');
			return;
		}
		  if(!this.addMovieForm.value.cast){
			alert('Please add a cast!');
			return;
		}

        this.mainService.addMovie(this.addMovieForm.value)
	}

	deleteMovie(movie: movie) {
        this.mainService.deleteMovie(movie)
	}
}
