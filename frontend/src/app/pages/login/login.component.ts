import { Component, OnInit } from '@angular/core';

import {
  Validators,
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validator,
  FormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginError: string | null=null;

  loginFormGroup = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });
  hide: boolean = true;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  getErrorMessage(field: string) {
    const control = this.loginFormGroup.get(field)!;
    if (control.hasError('required')) {
      return 'Vous devez entrer une valeur';
    }
    if (control.hasError('email')) {
      return 'Email non valide';
    }
    if (control.hasError('minlength')) {
      return 'Mot de passe trop court';
    }
    return '';
  }

  async login() {
    // console.log('login...')
    const isAdmin = await this.authService.isAdmin(); // jsonwebtoken > lire le token > user.role === admin > alors on se co
    // console.log('isAdmin: ', isAdmin)
    this.loginFormGroup.markAllAsTouched();
    // console.log('valid form ?: ', this.loginFormGroup.valid)
    if (this.loginFormGroup.valid) {
      const email = this.loginFormGroup.get('email')?.value!;
      const password = this.loginFormGroup.get('password')?.value!;

      this.authService.login(email, password).subscribe({
        next: (token) => {
          // console.log('log comp token: ', token)
          this.authService.setToken(token);
          // const user = this.jwtHelper.decodeToken(token)
          if (isAdmin) {
            this.router.navigate(['/dashboard'])
          } else {
            this.router.navigate(['/'])
          }
          // console.log('I just logged in');
        },
        error: (err) => {
          console.error(err);
          this.loginFormGroup.controls.password.reset();
          this.loginFormGroup.get('password')?.setErrors({
            invalid: true,
          });
          this.loginError = err.error.message;
        },
      });
    }
  }
}
