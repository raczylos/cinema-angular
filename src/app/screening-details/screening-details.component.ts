import { Component, OnInit } from '@angular/core';
import { ScreeningService } from '../screening.service';
import { screening } from 'src/screening';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../main.service';
import { room } from 'src/room';
import { movie } from 'src/movie';
import { FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-screening-details',
	templateUrl: './screening-details.component.html',
	styleUrls: ['./screening-details.component.css'],
})
export class ScreeningDetailsComponent implements OnInit {
	screening: screening | undefined;
	movies: movie[] = [];
	rooms: room[] = [];

	updateScreeningForm = this.formBuilder.group({
		id: '',
		film: '',
		date: '',
		time: '',
		room: '',
		soldTickets: 0,
		availableTickets: '',
		takenSeats: '',
	});

	constructor(
		private screeningService: ScreeningService,
		private mainService: MainService,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder
	) {
        this.mainService.updatedScreening$.subscribe((screening) => {
            console.log(screening)
            this.getScreening()
		});
    }

	ngOnInit(): void {

		this.getScreening();
        this.mainService.screenings$.subscribe(() => {
            this.getScreening()
        })
		this.mainService.movies$.subscribe((movies) => {
			this.movies = movies;
		});

		this.mainService.rooms$.subscribe((rooms) => {
			this.rooms = rooms;
		});
	}

	getScreening(): void {
		const screeningId = String(this.route.snapshot.paramMap.get('id'));

        let tempScreening: screening = this.mainService.getScreening(screeningId)!
        if (!(tempScreening.date instanceof Date)) {
            let dates: any = tempScreening.date;
            let date: Date = new Date(dates[0], dates[1], dates[2]);
            tempScreening.date = date;
        }
        this.screening = tempScreening;
	}

	onSubmit(): void {
		const screeningId = String(this.route.snapshot.paramMap.get('id'));

		this.mainService.updateScreening(
			this.updateScreeningForm.value,
			screeningId
		);
		console.log(this.updateScreeningForm.value);
	}
}
