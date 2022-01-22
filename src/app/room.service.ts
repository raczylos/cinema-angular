import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { room } from 'src/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private url = "http://localhost:7777/rooms"
  constructor(private http: HttpClient) { }

  getRooms(): Observable<room[]> {
    return this.http.get<room[]>(this.url)
      .pipe(
        catchError(this.handleError<room[]>('getRooms', []))
      );

  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + ' failed' + error);
      return of(result as T);
    };
  }

}
