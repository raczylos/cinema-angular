import { Component, OnInit } from '@angular/core';
import { ScreeningService } from '../screening.service';
import { screening } from 'src/screening';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-screening-details',
  templateUrl: './screening-details.component.html',
  styleUrls: ['./screening-details.component.css']
})
export class ScreeningDetailsComponent implements OnInit {
    screening: screening | undefined

  constructor(
      private screeningService: ScreeningService, 
      private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
      this.getScreening()
  }

  getScreening(): void {
    const screeningId = String(this.route.snapshot.paramMap.get('id'))

    this.screeningService.getScreening(screeningId).subscribe(screening => {
        let dates: any = screening.date
        let date: Date = new Date(dates[0], dates[1], dates[2])
        screening.date = date
        console.log(screening)
        this.screening = screening
    })
  }

}
