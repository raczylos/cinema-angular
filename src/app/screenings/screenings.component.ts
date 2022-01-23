import { Component, OnInit } from '@angular/core';
import { screening } from 'src/screening'
import { Router } from '@angular/router';
import { ScreeningService } from '../screening.service';
import { FormBuilder } from '@angular/forms';
import { MainService } from '../main.service';
import { movie } from 'src/movie';
import { room } from 'src/room';
import { FormControl } from '@angular/forms';

import { PopularityService } from '../popularity.service';

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
  

    allPopularity: { popularity: number[], popularityScreeningTitle: string[] } = {
        popularity: [],
        popularityScreeningTitle: []
      }
       
      

    selectedDate = new FormControl(new Date())

    selectedTime = new FormControl('0:00')
    filteredScreenings: screening[] = [...this.screenings]

    selectedScreening: screening | undefined
    // selectedScreening!: string

    // popularity: number[] = []
    // popularityScreeningTitle: string[] = []

    chart!: Chart

    addScreeningForm = this.formBuilder.group({
        id: '',
        film: '',
        date: '',
        time: '',
        room: '',
        soldTickets: 0,
        availableTickets: '',
        takenSeats: '',
        
    })

    constructor(
        private screeningService: ScreeningService,
        private mainService: MainService,
        private router: Router,
        private formBuilder: FormBuilder,
        private popularityService: PopularityService 
        
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

    getPopularity(): void {
        this.allPopularity = this.popularityService.getPopularity(this.filteredScreenings);
      }


    displayChart(): void {
        this.chart = new Chart("chart", {
            type: 'bar',
            data: {
                // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                labels: this.allPopularity.popularityScreeningTitle,
                datasets: [{
                    label: 'popularity chart',
                    // data: [12, 19, 3, 5, 2, 3],
                    data: this.allPopularity.popularity,
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
            this.chart.data.datasets[0].data = this.allPopularity.popularity
            this.chart.data.labels = this.allPopularity.popularityScreeningTitle
            this.chart.update();
        }
        
        
    }


                                    //NIZEJ STARE POPULARITY BEZ KORZYSTANIA Z SERWISU SYNCHRONICZNEGO
    // getPopularity(): void {
    //     this.popularity.length = 0
    //     this.popularityScreeningTitle.length = 0
    //     for (let screening of this.filteredScreenings) {

    //         if (screening.takenSeats) {
    //             if(this.popularityScreeningTitle.find(x => x === screening.film.title) != undefined){ // jezeli znajdziemy ten sam film to += do jego popularnosci
                    
    //                 let idx = this.popularityScreeningTitle.findIndex(x => x === screening.film.title)
    //                 this.popularity[idx] += screening.takenSeats.length
    //             }
    //             else{
    //                 this.popularity.push(screening.takenSeats.length)
    //                 this.popularityScreeningTitle.push(screening.film.title)
    //             }
    //         }
            
    //         console.log(screening.takenSeats)
            
    //         console.log(this.popularity)
            
    //         console.log(this.popularityScreeningTitle)
    //     }
        
    // }



    filteredScreeningsList(): void {
        console.log(this.selectedDate.value)
        let [selectedHours, selectedMinutes] = this.selectedTime.value.split(":")
        selectedHours = parseInt(selectedHours, 10)
        selectedMinutes = parseInt(selectedMinutes, 10)
        this.selectedDate.value.setHours(selectedHours)
        this.selectedDate.value.setMinutes(selectedMinutes)
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
        // this.getPopularity()
        this.displayChart()
        this.getPopularity()
        

       
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

        let date = this.addScreeningForm.controls['date'].value
        let [hours, minutes] = this.addScreeningForm.controls['time'].value.split(":")
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

        this.mainService.addScreening(this.addScreeningForm.value)
    }

}
