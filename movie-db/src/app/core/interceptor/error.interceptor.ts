import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthService } from './../../auth/auth.service';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private _AuthService: AuthService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((err) => {
                if (err && err?.status && err?.status == '401') {
                    this._AuthService.deleteLocalStorage();
                    this.router.navigate(['/login']);
                }
                const error = err?.error?.error_description || err?.error?.message || err?.status;
                return throwError(() => new Error(error));
            })
        );
    }

}