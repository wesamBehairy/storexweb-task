import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MoviesService } from '../movies.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css'],
})
export class CreateMovieComponent implements OnInit {
  error_message: string = '';
  movieImage: File;
  categories = [];

  createMovieForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
    category_id: new FormControl(null, [Validators.required]),
  });

  isSubmitted: boolean;

  constructor(private _MoviesService: MoviesService, private _Router: Router) {}

  ngOnInit(): void {
    this.getAllCategory();
  }

  handleFileInput(event: any) {
    let files = event?.target?.files;
    if (files.length) {
      this.movieImage = files.item(0);
    }
  }

  oncreateMovie(createMovieForm: FormGroup) {
    this.isSubmitted = true;

    let formData = new FormData();

    if (this.movieImage) {
      formData.append('image', this.movieImage);
    }
    formData.append('name', createMovieForm?.value?.name);
    formData.append('description', createMovieForm?.value?.description);
    formData.append('category_id', createMovieForm?.value?.category_id);

    this._MoviesService
      .createMovie(formData)
      .pipe(finalize(() => (this.isSubmitted = false)))
      .subscribe({
        next: (response: any) => {
          this._Router.navigate(['home']);
          console.log(response);
        },
        error: (error) => {
          this.error_message = error?.message;
          console.log(error);
        },
      });
  }

  getAllCategory() {
    this._MoviesService.getallCategory().subscribe({
      next: (response: any) => {
        if (response.status == 'success') {
          this.categories = response?.message;
        }
      },
      error: (error) => {
        this.error_message = error?.message;
        console.log(error);
      },
    });
  }
}
