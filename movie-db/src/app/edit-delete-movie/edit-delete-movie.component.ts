import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-edit-delete-movie',
  templateUrl: './edit-delete-movie.component.html',
  styleUrls: ['./edit-delete-movie.component.css']
})
export class EditDeleteMovieComponent implements OnInit {

  error_message: string = '';
  movieImage: File;
  categories = [];
  id;

  editMovieForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
    category_id: new FormControl(null, [Validators.required])
  });

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _MoviesService: MoviesService,
    private _Router: Router
  ) {
    this.id = _ActivatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getAllCategory();
    if (this.id) {
      this.getMovieById();
    }
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

  handleFileInput(event: any) {
    let files = event?.target?.files;
    if (files.length) {
      this.movieImage = files.item(0);
    }
  }

  // Edit
  onEditMovie(editMovieForm: FormGroup) {
    let formData = new FormData();

    if (this.movieImage) {
      formData.append('image', this.movieImage);
    }

    formData.append('name', editMovieForm?.value?.name);
    formData.append('description', editMovieForm?.value?.description);
    formData.append('category_id', editMovieForm?.value?.category_id);
    formData.append('_method', 'put');

    console.log("editMovieForm", editMovieForm.value);

    this._MoviesService.updateMovie(formData, this.id).subscribe({
      next: (response: any) => {
        if (response.status == "success") {
          this._Router.navigate(['home']);
          console.log(response);
        }
      },
      error: (error) => {
        this.error_message = error?.message;
        console.log(error);
      }
    });
  }

  getMovieById() {
    this._MoviesService.getMovieById(this.id).subscribe(
      response => {
        let movie = {
          name: response.message.name,
          description: response?.message?.description,
          category_id: response?.message?.category_id
        }
        this.editMovieForm.patchValue(movie);
        console.log(response);
      }
    )
  }


}
