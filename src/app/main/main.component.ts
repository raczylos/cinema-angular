import { Component, OnInit } from '@angular/core';
import { movie } from 'src/movie';
import { screening } from 'src/screening';
import { room } from 'src/room';
import { RoomService } from '../room.service';
import { MovieService } from '../movie.service';
import { ScreeningService } from '../screening.service';
import { MainService } from '../main.service';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
	private movies: movie[] = [];
	private screenings: screening[] = [];
	private rooms: room[] = [];

	constructor(
		private mainService: MainService,
		private movieService: MovieService,
		private screeningService: ScreeningService,
		private roomService: RoomService
	) {
		// subscribe 
        
        
	}
    
	ngOnInit(): void {
        this.updateMovie()
        this.getMovies()
        this.getScreenings()
        this.addMovie()
        this.deleteMovie()
        this.getRooms()
    }

    getMovies(): void {
        this.movieService.getMovies().subscribe(movies => {
            this.mainService.loadMovies(movies)
            console.log(movies)
        })
    }

    getRooms(): void {
        this.roomService.getRooms().subscribe(rooms => {
            this.mainService.loadRooms(rooms)
            console.log(rooms)
        })
    }

    addMovie(): void {
        this.mainService.addedMovie$.subscribe(movie => {
            console.log("adding movie")
            this.movieService.addMovie(movie).subscribe()
        })
    }

    getScreenings(): void {
        this.screeningService.getScreenings().subscribe(screenings => {
            this.mainService.loadScreenings(screenings)
            console.log(screenings)
        })
    }

    addScreening(): void {
        this.mainService.addedScreening$.subscribe(screening => {
            this.screeningService.addScreening(screening).subscribe(() => {
                this.getScreenings()
            })
        })
    }

    updateMovie(): void {
        this.mainService.updatedMovie$.subscribe(movie => {
            this.movieService.updateMovie(movie, movie.id).subscribe(movie => {
                this.getMovies()
                this.getScreenings()
            })
        })
    }

    deleteMovie(): void {
        this.mainService.deletedMovie$.subscribe(movie => {
            this.movieService.deleteMovie(movie).subscribe(() => {
                this.getMovies()
                this.getScreenings()
            })
        })
    }
}
