import { Component, OnInit } from '@angular/core';
import axios from 'axios'

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
        // this.name = 'Joanna';
        // this.surname = 'Krupa';
        // this.dateOfBirth = new Date('2000-03-18');
        // this.interests = ['tennis', 'programming', 'photography'];




        // console.log(this.screenings[0].date)
    }

}
