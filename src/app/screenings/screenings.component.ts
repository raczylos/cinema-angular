import { Component, OnInit } from '@angular/core';
import { screening } from 'src/screening'
import { Router } from '@angular/router';
import { ScreeningService } from '../screening.service';

@Component({
    selector: 'app-screenings',
    templateUrl: './screenings.component.html',
    styleUrls: ['./screenings.component.css']
})
export class ScreeningsComponent implements OnInit {

    screenings: screening[] = [];

    constructor(
        private screeningService: ScreeningService,
        private router: Router,
    ) { }

    navigate(screening: screening): void {
        console.log(screening.id)
        this.router.navigate(['/screenings', screening.id])
    }

    ngOnInit(): void {
        this.getScreenings()
    }

    getScreenings(): void {
        this.screeningService.getScreenings().subscribe(screenings => {
            console.log(screenings)
            for(let screening of screenings) {
                let dates: any = screening.date
                let date: Date = new Date(dates[0], dates[1], dates[2])
                screening.date = date
            }
            this.screenings = screenings
            
        })
    }

}
