import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateMovieComponent } from './create-movie/create-movie.component';
import { BrowseMoviesComponent } from './browse-movies/browse-movies.component';
import { EditDeleteMovieComponent } from './edit-delete-movie/edit-delete-movie.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, HomeComponent, NavbarComponent, CreateMovieComponent, BrowseMoviesComponent, EditDeleteMovieComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
