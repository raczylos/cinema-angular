import { Component, OnInit, Input, ModuleWithProviders, EventEmitter, NgModule } from '@angular/core';
import { MovieService } from '../movie.service';
import { movie } from 'src/movie';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MainService } from '../main.service';

import { Router } from '@angular/router';

import { FormGroup } from '@angular/forms';
import { Chart } from 'chart.js';
import { PopularityService } from '../popularity.service';
import { screening } from 'src/screening';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie!: movie
  faTimes = faTimes;
  screenings: screening[] = []

  chart!: Chart

  allPopularity: { popularity: number[], popularityScreeningTitle: string[] } = {
    popularity: [],
    popularityScreeningTitle: []
  }

  updateMovieForm = this.formBuilder.group({
    id: '',
    title: '',
    duration: '',
    description: '',
    cast: ''
  })

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private movieService: MovieService,
    private mainService: MainService,
    private formBuilder: FormBuilder,
    private router: Router,
    private popularityService: PopularityService
  ) {
    mainService.updatedMovie$.subscribe(movie => {
      this.movie = movie
    })
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
  }

  ngOnInit(): void {

    this.getMovie()
    this.updateMovieForm.setValue({
      id: "",
      title: this.movie!.title,
      duration: this.movie!.duration,
      description: this.movie!.description,
      cast: this.movie!.cast
    })

    this.getPopularity()
    this.displayChart()


  }

  getPopularity(): void {
    this.allPopularity = this.popularityService.getPopularity(this.screenings, this.movie);
  }


  displayChart(): void {
    this.chart = new Chart("chart", {
      type: 'bar',
      data: {
        labels: this.allPopularity.popularityScreeningTitle,
        datasets: [{
          label: `popularity chart (${this.movie.title})`,

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
        // this.chart.data.datasets[0].label = `popularity chart (${this.movie.title})`
        console.log("consolelsllslsl" + this.chart.data.datasets[0].label)
        this.chart.data.labels = this.allPopularity.popularityScreeningTitle
        this.chart.update();
    }
    
}
  
  getMovie(): void {
    const movieId = String(this.route.snapshot.paramMap.get('id'))
    this.movie = this.mainService.getMovie(movieId)!

  }

  onSubmit(): void {
    const movieId = String(this.route.snapshot.paramMap.get('id'))
    let isnum = /^\d+$/.test(this.updateMovieForm.value.duration);

    if (!this.updateMovieForm.value.title) {
      alert('Please add a title!');
      return;
    }
    else if (this.updateMovieForm.value.title.length <= 1) {
      alert('Name can not be less than 1 character')
      return;
    }
    else if (this.updateMovieForm.value.title.charAt(0) !== this.updateMovieForm.value.title.charAt(0).toUpperCase()) {
      alert('First letter needs to be in upper case or a number.')
      return;
    }
    if (!this.updateMovieForm.value.duration) {
      alert('Please add a duration!');
      return;
    }
    if (!isnum) {
      alert('Duration must be a number!');
      return;
    }
    else if (this.updateMovieForm.value.duration < 30) {
      alert('Duration must be more than 30')
      return;
    }
    else if (this.updateMovieForm.value.duration > 300) {
      alert('Duration must be less than 300')
      return;
    }
    if (!this.updateMovieForm.value.description) {
      alert('Please add a description!');
      return;
    }
    if (!this.updateMovieForm.value.cast) {
      alert('Please add a cast!');
      return;
    }




    // this.movieService.updateMovie(this.updateMovieForm.value, movieId).subscribe(movie => {
    //   this.movie = movie
    // })
    this.mainService.updateMovie(this.updateMovieForm.value, movieId)

    this.updateData()

  }

}
