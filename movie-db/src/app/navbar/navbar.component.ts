import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean;

  constructor(private _AuthService: AuthService, private _Router: Router) {}

  ngOnInit(): void {
    this.checkAuth();
  }

  onLogout() {
    this._AuthService.deleteLocalStorage();
    this._Router.navigate(['login']);
  }

  checkAuth() {
    this._AuthService.userInfoData.subscribe((response) => {
      if (response) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });
  }
}
