import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private _HttpClient: HttpClient) { }

  // all movies
  getallmovies(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}movies`)
  }

  // all Category
  getallCategory(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}category`)
  }

  // create movie
  createMovie(movieData: object) {
    return this._HttpClient.post(`${environment.baseUrl}movies`, movieData)
  }

  // update movie
  updateMovie(movieData: object, id: any): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}movies/${id}`, movieData)
  }

  getMovieById(id): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}movies/${id}`)
  }

  // delete movie
  deleteMovie(id: any) {
    return this._HttpClient.delete(`${environment.baseUrl}movies/${id}`)
  }

  listByCategory(catId: any) {
    return this._HttpClient.get(`${environment.baseUrl}moviesByCategory/${catId}`)
  }

}
