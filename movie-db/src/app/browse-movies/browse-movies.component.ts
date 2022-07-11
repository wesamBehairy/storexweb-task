import { Component, OnInit } from '@angular/core';
import { MoviesService } from './../movies.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse-movies',
  templateUrl: './browse-movies.component.html',
  styleUrls: ['./browse-movies.component.css']
})
export class BrowseMoviesComponent implements OnInit {
  error_message: string = '';
  categories = [];
  movies: any[] = [];
  image_prefix = "https://test-api.storexweb.com/";

  browseMovieForm = new FormGroup({
    category_id: new FormControl(null, [Validators.required])
  });

  constructor(private _MoviesService: MoviesService) { }

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory() {
    this._MoviesService.getallCategory().subscribe({
      next: (response: any) => {
        if (response.status == "success") {
          this.categories = response?.message;
        }
      },
      error: (error) => {
        this.error_message = error?.message;
        console.log(error);
      }
    });
  }

  listByCategory(browseMovieForm) {
    this._MoviesService.listByCategory(browseMovieForm.value.category_id).subscribe({
      next: (response: any) => {
        if (response.status == "success") {
          this.error_message = "";

          this.movies = response.message;
        } if (response.message.length == 0) {
          this.error_message = "no Movies Found";
        }
        console.log(response);
      },
      error: (error) => {
        this.error_message = error?.message;
        console.log(error);
      }
    });
  }

  // delete
  onDelete(id: any) {
    this._MoviesService.deleteMovie(id).subscribe({
      next: (response: any) => {
        if (response.status == "success") {
          this.movies = this.movies.filter(movie => movie.id != id);
        }
      },
      error: (error) => {
        this.error_message = error?.message;
        console.log(error);
      }
    });
  }

}
