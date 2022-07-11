import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

// import jwtDecode from 'jwt-decode';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: any = '';
  userInfoData = new BehaviorSubject(null);
  user: any;

  constructor(private _HttpClient: HttpClient) {
    let token = localStorage.getItem('userToken');
    if (!token) return;
    this.userInfoData.next(token);
  }

  register(formData: any) {
    return this._HttpClient.post(
      `https://test-api.storexweb.com/api/register`,
      formData
    );
  }

  login(formData: any): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}login`, formData).pipe(
      map((response: any) => {
        this.setUserToken(response.authorisation.token);
        return response;
      })
    );
  }

  deleteLocalStorage() {
    this.userInfoData.next(null);
    localStorage.removeItem('userToken');
  }

  setUserToken(payload): void {
    localStorage.setItem('userToken', payload);
    this.userInfoData.next(payload);
  }
}
