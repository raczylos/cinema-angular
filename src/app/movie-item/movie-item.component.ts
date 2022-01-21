import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { movie } from 'src/Movie';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})

export class MovieItemComponent implements OnInit {
  @Input()movie!: movie;
  @Output() onDeleteMovie: EventEmitter<movie> = new EventEmitter();
  @Output() editClicked: EventEmitter<movie> = new EventEmitter();
  faTimes = faTimes;

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(movie: movie){
    this.onDeleteMovie.emit(movie);
  }

  onEditClicked(){
    this.editClicked.emit();
  }
}
