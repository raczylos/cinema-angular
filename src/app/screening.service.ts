import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { screening } from 'src/screening';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ScreeningService {

  private url = 'http://localhost:5000/screenings';

  constructor(private http: HttpClient) { }

  getscreenings(): Observable<screening[]> {
    return this.http.get<screening[]>(this.url)
      .pipe(
        catchError(this.handleError<screening[]>('getOrders', []))
      );

  }

  addscreening(screening: screening): Observable<screening> {

    return this.http.post<screening>(this.url, screening, httpOptions)
      .pipe(
        catchError(this.handleError<screening>('addscreening'))
      )
  }

  deletescreening(screening: screening): Observable<screening> {
    const url = `${this.url}/${screening.id}`;

    return this.http.delete<screening>(url, httpOptions)
      .pipe(
        catchError(this.handleError<screening>('deletescreening'))
      )
  }

  updatescreening(screening: screening): Observable<screening> {
    return this.http.put<screening>(this.url, screening, httpOptions)
      .pipe(
        catchError(this.handleError<screening>('addscreening'))
      )
  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + ' failed' + error);
      return of(result as T);
    };
  }

}
