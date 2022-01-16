import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Movie } from 'src/Movie';
import { catchError } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})



export class MovieService {

    private url = 'http://localhost:5000/movies';

    constructor(private http: HttpClient) { }



    getMovies(): Observable<Movie[]> {
        return this.http.get<Movie[]>(this.url)
            .pipe(
                catchError(this.handleError<Movie[]>('getOrders', []))
            );

    }

    addMovie(movie: Movie): Observable<Movie> {

        return this.http.post<Movie>(this.url, movie, httpOptions)
            .pipe(
                catchError(this.handleError<Movie>('addMovie'))
            )
    }

    deleteMovie(movie: Movie): Observable<Movie> {
        const url = `${this.url}/${movie.id}`;

        return this.http.delete<Movie>(url, httpOptions)
            .pipe(
                catchError(this.handleError<Movie>('deleteMovie'))
            )
    }

    updateMovie(movie: Movie): Observable<Movie> {
        return this.http.put<Movie>(this.url, movie, httpOptions)
            .pipe(
                catchError(this.handleError<Movie>('addMovie'))
            )
    }




    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(operation + ' failed' + error);
            return of(result as T);
        };
    }

}
