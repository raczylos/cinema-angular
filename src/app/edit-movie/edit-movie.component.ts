import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { movie } from 'src/Movie';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditMovieComponent>,
    @Inject(MAT_DIALOG_DATA) public movie: movie) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

  onFormSubmit(form: NgForm){

    const updatedMovie = {
      ...this.movie,
      ...form.value
    }

    this.dialogRef.close(updatedMovie)
  }

}
