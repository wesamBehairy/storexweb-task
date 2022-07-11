import { Component, OnInit } from '@angular/core';
import { MoviesService } from './../movies.service';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  error_message: string = '';
  movies: any[] = [];
  image_prefix = 'https://test-api.storexweb.com/';

  constructor(
    private _MoviesService: MoviesService,
    private _AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.getmovies();
  }

  getmovies() {
    this._MoviesService.getallmovies().subscribe({
      next: (response: any) => {
        if (response.status == 'success') {
          this.movies = response?.message;
        } else {
          this.error_message = 'no Movies Found';
        }
      },
      error: (error) => {
        this.error_message = error?.message;
        console.log(error);
      },
    });
  }

  // delete
  onDelete(id: any) {
    this._MoviesService.deleteMovie(id).subscribe({
      next: (response: any) => {
        if (response.status == 'success') {
          this.movies = this.movies.filter((movie) => movie.id != id);
          console.log(response);
        }
      },
      error: (error) => {
        this.error_message = error?.message;
        console.log(error);
      },
    });
  }
}
