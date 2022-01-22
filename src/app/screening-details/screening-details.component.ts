import { Component, OnInit } from '@angular/core';
import { ScreeningService } from '../screening.service';
import { screening } from 'src/screening';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../main.service';
import { room } from 'src/room';
import { movie } from 'src/movie';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';

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
  availableSeats: any = []
  // seatObject: Object = Object.create(null)
  seatObject: any = {}
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
    const screeningId = String(this.route.snapshot.paramMap.get('id'))
    let takenSeats = [...this.screening.takenSeats]
    takenSeats.push(this.choosenSeat)
    this.screening.takenSeats = takenSeats
    this.screening.soldTickets++

    this.mainService.buyTickets(this.screening, screeningId)
    this.availableSeatsList()
  }
}
