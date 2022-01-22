import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { screening } from 'src/screening';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
	providedIn: 'root',
})
export class ScreeningService {
	private url = 'http://localhost:7777/screenings';

	constructor(private http: HttpClient) { }

	getScreenings(): Observable<screening[]> {
		return this.http
			.get<screening[]>(this.url)
			.pipe(
				catchError(this.handleError<screening[]>('getScreenings', []))
			);
	}

	getScreening(id: string): Observable<screening> {
		const url: string = `${this.url}/${id}`;
		return this.http
			.get<screening>(url)
			.pipe(
				catchError(this.handleError<screening>('getScreening'))
			);
	}

	addScreening(screening: screening): Observable<screening> {
		return this.http
			.post<screening>(this.url, screening, httpOptions)
			.pipe(catchError(this.handleError<screening>('addScreening')));
	}

	deleteScreening(screening: screening): Observable<screening> {
		const url = `${this.url}/${screening.id}`;

		return this.http
			.delete<screening>(url, httpOptions)
			.pipe(catchError(this.handleError<screening>('deleteScreening')));
	}

	updateScreening(screening: screening, id: string): Observable<screening> {
		const url = `${this.url}/${id}`
		screening.id = id
		return this.http
			.put<screening>(url, screening, httpOptions)
			.pipe(catchError(this.handleError<screening>('updateScreening')));
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(operation + ' failed' + error);
			return of(result as T);
		};
	}
}
