import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error_message: string = '';

  RegisterForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/.{5,}/)])
  });

  constructor(
    private _AuthService: AuthService,
    private _Router: Router
  ) { }

  ngOnInit(): void {
  }

  // register
  onSignUp(registerForm: FormGroup) {
    if (registerForm.valid) {
      this._AuthService.register(registerForm.value).subscribe({
        next: (response: any) => {
          if (response.message === "User created successfully") {
            this._Router.navigate(['login']);
          } else {
            this.error_message = response?.message?.email;
          }
          console.log(response);
        },
        error: (error) => {
          console.log(error);
          this.error_message = error?.message?.email;
        }
      });
    } else {
      this.error_message = "from is invalid";
    }
  }

}
