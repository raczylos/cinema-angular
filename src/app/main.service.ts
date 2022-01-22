import { Injectable } from '@angular/core';
import { movie } from 'src/movie';
import { screening } from 'src/screening';
import { room } from 'src/room';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class MainService {
    private moviesSource: BehaviorSubject<movie[]> = new BehaviorSubject<movie[]>([])
    private screeningsSource: BehaviorSubject<screening[]> = new BehaviorSubject<screening[]>([])
    private roomsSource: BehaviorSubject<room[]> = new BehaviorSubject<room[]>([])
    private updatedMovieSource: Subject<movie> = new Subject<movie>()
    private updatedScreeningSource: Subject<screening> = new Subject<screening>()
    private buyTicketsSource: Subject<screening> = new Subject<screening>()
    private addedMovieSource: Subject<movie> = new Subject<movie>()
    private deletedMovieSource: Subject<movie> = new Subject<movie>()

    private addedScreeningSource: Subject<screening> = new Subject<screening>()

    movies$ = this.moviesSource.asObservable()
    screenings$ = this.screeningsSource.asObservable()
    rooms$ = this.roomsSource.asObservable()
    updatedMovie$ = this.updatedMovieSource.asObservable()
    updatedScreening$ = this.updatedScreeningSource.asObservable()
    addedMovie$ = this.addedMovieSource.asObservable()
    deletedMovie$ = this.deletedMovieSource.asObservable()
    buyTickets$ = this.buyTicketsSource.asObservable()
    addedScreening$ = this.addedScreeningSource.asObservable()

    private movies: movie[] = []
    private screenings: screening[] = []
    private rooms: room[] = []

    getMovie(id: string): movie | undefined {
        return this.moviesSource.getValue().find(x => x.id === id)
    }

    getScreening(id: string): screening | undefined {
        return this.screeningsSource.getValue().find(x => x.id === id)
    }

    updateMovie(movie: movie, id: string): void {
        let moviesCopy = this.moviesSource.getValue()
        let idx = moviesCopy.findIndex(x => x.id === id)
        movie.id = id
        this.updatedMovieSource.next(movie)
    }

    updateScreening(screening: screening, id: string): void {
        let screningsCopy = this.screeningsSource.getValue()
        let idx = screningsCopy.findIndex(x => x.id === id)
        screening.id = id
        this.updatedScreeningSource.next(screening)
    }

    buyTickets(screening: screening, id: string): void {
        let screningsCopy = this.screeningsSource.getValue()
        let idx = screningsCopy.findIndex(x => x.id === id)
        screening.id = id
        this.buyTicketsSource.next(screening)
    }

    deleteMovie(movie: movie): void {
        this.deletedMovieSource.next(movie)
    }

    addMovie(movie: movie): void {
        let moviesCopy = this.moviesSource.getValue()
        this.moviesSource.next([...moviesCopy, movie])
        this.addedMovieSource.next(movie)
    }

    addScreening(screening: screening): void {
        let screeningsCopy = this.screeningsSource.getValue()
        // this.screeningsSource.next([...screeningsCopy, screening])

        this.addedScreeningSource.next(screening)
    }

    loadMovies(movies: movie[]): void {
        this.moviesSource.next(movies)
        this.movies = movies
    }

    loadScreenings(screenings: screening[]): void {
        this.screeningsSource.next(screenings)
        this.screenings = screenings
    }

    loadRooms(rooms: room[]): void {
        this.roomsSource.next(rooms)
        this.rooms = rooms
    }

    constructor() { }
}
