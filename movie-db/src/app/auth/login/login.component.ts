import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error_message: string = '';

  LoginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/.{5,}/)]),
  });

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSignIn(LoginForm: FormGroup) {
    if (LoginForm.valid) {
      this._AuthService.login(LoginForm.value).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.status === "success") {
            this._Router.navigate(['home']);
          } else {
            this.error_message = response?.message;
          }
        },
        error: (error) => {
          console.log(error);
          this.error_message = error?.message;
        }
      });

    } else {
      this.error_message = "from is invalid";
    }
  }

}
