import { Component, OnInit } from '@angular/core';
import { screening } from 'src/screening'
import { Router } from '@angular/router';
import { ScreeningService } from '../screening.service';
import { FormBuilder } from '@angular/forms';
import { MainService } from '../main.service';
import { movie } from 'src/movie';
import { room } from 'src/room';
import { FormControl } from '@angular/forms';
@Component({
    selector: 'app-screenings',
    templateUrl: './screenings.component.html',
    styleUrls: ['./screenings.component.css']
})
export class ScreeningsComponent implements OnInit {

    screenings: screening[] = []
    movies: movie[] = []
    rooms: room[] = []

    selectedDate = new FormControl(new Date())
    filteredScreenings: screening[] = [...this.screenings]

    selectedScreening: screening | undefined
    // selectedScreening!: string

    addScreeningForm = this.formBuilder.group({
        id: '',
        film: '',
        date: '',
        time: '',
        room: '',
        soldTickets: 0,
        availableTickets: '',
        takenSeats: ''
    })

    constructor(
        private screeningService: ScreeningService,
        private mainService: MainService,
        private router: Router,
        private formBuilder: FormBuilder
    ) {
        this.mainService.screenings$.subscribe(screenings => {
            console.log(screenings)
            for (let screening of screenings) {

                if (screening.date instanceof Date) {
                    continue
                }
                let dates: any = screening.date
                let date: Date = new Date(dates[0], dates[1], dates[2])
                screening.date = date
            }
            this.screenings = screenings
        })
        this.mainService.rooms$.subscribe(rooms => {
            this.rooms = rooms
        })
        this.mainService.movies$.subscribe(movies => {
            this.movies = movies
        })
    }

    filteredScreeningsList(): void {
        console.log(this.selectedDate.value)
        let newScreenings = this.screenings.filter(x => {
            let d = new Date(x.date.getTime())
            let [hours, minutes] = x.time.split(":")
            d.setHours(parseInt(hours))
            d.setMinutes(parseInt(minutes))
            return d > this.selectedDate.value
        })
        console.log(newScreenings)
        this.filteredScreenings = newScreenings
    }

    navigate(screening: screening): void {
        console.log(screening.id)
        this.router.navigate(['/screenings', screening.id])
    }

    ngOnInit(): void {
        this.filteredScreeningsList()
        this.mainService.screenings$.subscribe(() => {
            this.filteredScreeningsList()
        })
    }

    // getScreenings(): void {
    //     this.screeningService.getScreenings().subscribe(screenings => {
    //         console.log(screenings)
    //         for (let screening of screenings) {
    //             let dates: any = screening.date
    //             let date: Date = new Date(dates[0], dates[1], dates[2])
    //             screening.date = date
    //         }
    //         this.screenings = screenings

    //     })
    // }



    onSubmit(): void {
        // this.screeningService.addScreening(this.addScreeningForm.value).subscribe(screening => {
        //     console.log(screening)
        // })
        this.mainService.addScreening(this.addScreeningForm.value)
    }

}
