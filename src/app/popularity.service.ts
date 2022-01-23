import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { screening } from 'src/screening'
import { movie } from 'src/movie';

@Injectable({
  providedIn: 'root'
})
export class PopularityService {

  popularity: number[] = []
  popularityScreeningTitle: string[] = []

  allPopularity: { popularity: number[], popularityScreeningTitle: string[] } = {
    popularity: [],
    popularityScreeningTitle: []
  }

  constructor(
    private mainService: MainService
  ) {

  }
                          // stara popularnosc nie dla poszczegolnych filmow
  // getPopularity(screenings: screening[]): { popularity: number[], popularityScreeningTitle: string[] } { // typ pewnie screening[] 
  //   this.popularity.length = 0
  //   this.popularityScreeningTitle.length = 0
  //     for (let screening of screenings) {

  //     if (screening.takenSeats) {
  //         console.log(this.popularityScreeningTitle)
  //       if (this.popularityScreeningTitle.find(x => x === screening.film.title) != undefined) { // jezeli znajdziemy ten sam film to += do jego popularnosci

  //         let idx = this.popularityScreeningTitle.findIndex(x => x === screening.film.title)
  //         this.popularity[idx] += screening.takenSeats.length
  //       }
  //       else {
  //         this.popularity.push(screening.takenSeats.length)
  //         this.popularityScreeningTitle.push(screening.film.title)
  //       }
  //     }

  //   }

  //   this.allPopularity.popularity = this.popularity
  //   this.allPopularity.popularityScreeningTitle = this.popularityScreeningTitle

  //   return this.allPopularity
  // }

  getPopularity(screenings: screening[], movie: movie): { popularity: number[], popularityScreeningTitle: string[] } {  
    this.popularity.length = 0
    this.popularityScreeningTitle.length = 0
  
    for (let screening of screenings) {

      if(screening.film.id == movie.id){
        this.popularity.push(screening.soldTickets)
        this.popularityScreeningTitle.push(screening.date.toLocaleDateString())
      }

    }
    
    this.allPopularity.popularity = this.popularity
    this.allPopularity.popularityScreeningTitle = this.popularityScreeningTitle

    console.log(this.popularity)
    console.log(this.popularityScreeningTitle)

    return this.allPopularity
  }

}
