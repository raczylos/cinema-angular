import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { room } from 'src/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private url = "http://localhost:5000/rooms"
  constructor(private http: HttpClient) { }

  getrooms(): Observable<room[]> {
    return this.http.get<room[]>(this.url)
      .pipe(
        catchError(this.handleError<room[]>('getOrders', []))
      );

  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + ' failed' + error);
      return of(result as T);
    };
  }

}
