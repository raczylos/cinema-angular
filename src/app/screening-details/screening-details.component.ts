import { Component, OnInit } from '@angular/core';
import { ScreeningService } from '../screening.service';
import { screening } from 'src/screening';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../main.service';
import { room } from 'src/room';
import { movie } from 'src/movie';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
    selector: 'app-screening-details',
    templateUrl: './screening-details.component.html',
    styleUrls: ['./screening-details.component.css'],
})



export class ScreeningDetailsComponent implements OnInit {
    screening!: screening; // wczesniej bylo to screening: screening | undefined
    movies: movie[] = [];
    rooms: room[] = [];
    // choosenSeat: string[] = [];

    choosenSeat: string = ''
    availableSeats: string[] = []
    // seatObject: Object = Object.create(null)

    
    seatObject: { [key: string]: string } = {}
    availableSeatsList(): void {
        // for(let i = 0; i < parseInt(this.screening.room.capacity) - this.screening.soldTickets; i++){
        //   console.log("ilosc miejsc wolnych = " + (parseInt(this.screening.room.capacity) - this.screening.soldTickets))
        //   this.availableSeats = 
        // }
        for (let i = 1; i <= parseInt(this.screening.room.capacity); i++) {
            this.seatObject[i] = "free"
        }

        for (let seat of this.screening.takenSeats) {
            this.seatObject[seat] = "taken"
        }
        let seats = []
        for (let seat in this.seatObject) {
            if (this.seatObject[seat] === "free") {
                seats.push(seat)
            }
        }
        this.choosenSeat = seats[0]
        this.availableSeats = seats
    }
    updateScreeningForm = this.formBuilder.group({
        id: '',
        film: '',
        date: '',
        time: '',
        room: '',
        soldTickets: 0,
        availableTickets: '',
        takenSeats: [],
    });

    constructor(
        private screeningService: ScreeningService,
        private router: Router,
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
        this.availableSeatsList()

        this.updateScreeningForm.setValue({
            id: '',
            film: this.screening.film.id,
            date: '',
            time: '',
            room: this.screening.room.nr,
            soldTickets: 0,
            availableTickets: '',
            takenSeats: [],
        })
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
        const screeningId = String(this.route.snapshot.paramMap.get('id'))

        let date = this.updateScreeningForm.controls['date'].value
        if(!date){
            
            alert("date is empty")
            return ;
        }
        let [hours, minutes] = this.updateScreeningForm.controls['time'].value.split(":")
        if(!hours){
            alert("time is empty")
            return ;
        }
        hours = parseInt(hours, 10)
        minutes = parseInt(minutes, 10)
        date = date.split('-')
        date = date.map((x: string) => parseInt(x))
        date[1]--
        date = new Date(date[0], date[1], date[2], hours, minutes)

        let currentDate = new Date();

        if(date < currentDate) {
            alert('Choose a valid date');
            return;
        }


        this.mainService.updateScreening(
            this.updateScreeningForm.value,
            screeningId
        );
        console.log(this.updateScreeningForm.value);
    }
    onSubmitBuyTicket(): void {
        if (!this.choosenSeat) {
            console.log("nie ma wolnych miejsc")
            return
        }
        console.log(this.screening)
        const screeningId = String(this.route.snapshot.paramMap.get('id'))
        let takenSeats = [...this.screening.takenSeats]
        takenSeats.push(this.choosenSeat)
        this.screening.takenSeats = takenSeats
        this.screening.soldTickets++

        this.mainService.buyTickets(this.screening, screeningId)
        this.availableSeatsList()
    }
}
