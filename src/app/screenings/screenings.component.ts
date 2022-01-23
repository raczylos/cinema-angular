import { Component, OnInit } from '@angular/core';
import { screening } from 'src/screening'
import { Router } from '@angular/router';
import { ScreeningService } from '../screening.service';
import { FormBuilder } from '@angular/forms';
import { MainService } from '../main.service';
import { movie } from 'src/movie';
import { room } from 'src/room';
import { FormControl } from '@angular/forms';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


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

    popularity: number[] = []
    popularityScreeningTitle: string[] = []

    chart!: Chart

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


    displayChart(): void {
        this.chart = new Chart("chart", {
            type: 'bar',
            data: {
                // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                labels: this.popularityScreeningTitle,
                datasets: [{
                    label: 'popularity chart',
                    // data: [12, 19, 3, 5, 2, 3],
                    data: this.popularity,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }


    updateData(): void {
        this.getPopularity()
        
        if(this.chart !== undefined){
            console.log("moge wejsc")
            this.chart.data.datasets[0].data = this.popularity
            this.chart.data.labels = this.popularityScreeningTitle
            this.chart.update();
        }
        
        
    }



    getPopularity(): void {
        this.popularity.length = 0
        this.popularityScreeningTitle.length = 0
        for (let screening of this.filteredScreenings) {

            if (screening.takenSeats) {
                if(this.popularityScreeningTitle.find(x => x === screening.film.title) != undefined){ // jezeli znajdziemy ten sam film to += do jego popularnosci
                    
                    let idx = this.popularityScreeningTitle.findIndex(x => x === screening.film.title)
                    this.popularity[idx] += screening.takenSeats.length
                }
                else{
                    this.popularity.push(screening.takenSeats.length)
                    this.popularityScreeningTitle.push(screening.film.title)
                }
            }
            
            console.log(screening.takenSeats)
            
            console.log(this.popularity)
            
            console.log(this.popularityScreeningTitle)
        }
        
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
        
        this.updateData()

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
        this.getPopularity()
        this.displayChart()

       
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
