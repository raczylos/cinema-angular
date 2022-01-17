import { Component, OnInit } from '@angular/core';
import axios from 'axios'

import { ScreeningService } from '../screening.service';

@Component({
    selector: 'app-screenings',
    templateUrl: './screenings.component.html',
    styleUrls: ['./screenings.component.css']
})
export class ScreeningsComponent implements OnInit {

    // film: string = '';
    // time: string = '';
    // room: string = '';
    // soldTickets: number = 0;
    // availableTickets: string = '';
    // date: Date = new Date();
    // takenSeats: string[] = [];

    screenings: any[] = [];
    movies: any[] = [];
    rooms: any[] = [];

    constructor() {


    }





    ngOnInit(): void {
        

    }

}
