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

  fetchData = async () => {
    let data = null
    await axios.get("http://localhost:7777/")
      .then(res => {
        data = res.data;
        console.log(data)
        let { movies, screenings, rooms } = data
        for (let room of rooms) {
          room.nr = `${room.nr}`
        }
        for (let screening of screenings) {
          let roomId = screening.room as string
          let filmId = screening.film
          let date = new Date(screening.date)
          screening.date = date
          screening.room = rooms.find((item: any) => {
            return item.nr === (roomId)
          })
          screening.film = movies.find((item: any) => {
            return item.id === filmId
          })
        }
        this.movies = movies;
        this.screenings = screenings;
        this.rooms = rooms;
      })
  }



  ngOnInit(): void {
    // this.name = 'Joanna';
    // this.surname = 'Krupa';
    // this.dateOfBirth = new Date('2000-03-18');
    // this.interests = ['tennis', 'programming', 'photography'];

    

    this.fetchData()
    // console.log(this.screenings[0].date)
  }

}
