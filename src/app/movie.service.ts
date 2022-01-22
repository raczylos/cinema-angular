import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { movie } from 'src/Movie';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})



export class MovieService {

    private url = 'http://localhost:7777/movies';
    private moviesSource = new Subject<movie[]>();
    movies$ = this.moviesSource.asObservable()

    constructor(private http: HttpClient) { }



    getMovies(): Observable<movie[]> {
        return this.http.get<movie[]>(this.url)
            .pipe(
                catchError(this.handleError<movie[]>('getMovies', []))
            );

    }

    addMovie(movie: movie): Observable<movie> {

        return this.http.post<movie>(this.url, movie, httpOptions)
            .pipe(
                catchError(this.handleError<movie>('addMovie'))
            )
    }

    deleteMovie(movie: movie): Observable<movie> {
        const url = `${this.url}/${movie.id}`;

        return this.http.delete<movie>(url, httpOptions)
            .pipe(
                catchError(this.handleError<movie>('deleteMovie'))
            )
    }

    getMovie(id: string): Observable<movie> {
        const url = `${this.url}/${id}`
        return this.http.get<movie>(url, httpOptions)
            .pipe(
                catchError(this.handleError<movie>('getMovie'))
            )
    }

    updateMovie(movie: movie, id: string): Observable<movie> {
        const url = `${this.url}/${id}`;
        movie.id = id
        return this.http.put<movie>(url, movie, httpOptions)
            .pipe(
                catchError(this.handleError<movie>('updateMovie'))
            )
    }




    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(operation + ' failed' + error);
            return of(result as T);
        };
    }

}
