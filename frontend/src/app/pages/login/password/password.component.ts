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
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import {
  ValidationService,
  VALIDATOR_NAMES,
} from 'src/app/services/validation.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {
  validError: string | null = null;

  validFormGroup = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
  });

  hide: boolean = true;

  constructor(
    public authService: AuthService,
    private router: Router,
    public userService: UserService
  ) {}

  ngOnInit(): void {}

  // getErrorMessage(field: string) {
  //   const constrol = this.validFormGroup.get(field)!;
  //   if (constrol.hasError('required')) {
  //     return 'You must enter a value';
  //   }
  //   if (constrol.hasError('email')) {
  //     return 'Not a valid email';
  //   }
  //   return '';}

  async validateEmail() {
    this.validFormGroup.markAllAsTouched();

    if (this.validFormGroup.valid) {
      const email = this.validFormGroup.get('email')?.value!;

      // const result = await this.authService.validateEmail(email);
      // if(result) {
      //   this.router.navigate(['/login']);
      // } else {
      //   this.validError = 'Email not found';
      // }
    }
  }

  getErrorMessage(field: string) {
    const control = this.validFormGroup.get(field)!;

    let foundError;

    for (let i = 0; i < VALIDATOR_NAMES.length; i++) {
      const validatorName = VALIDATOR_NAMES[i];

      if (control.hasError(validatorName)) {
        // console.log('control.errors->', control.errors);
        // control.errors[validatorName]
        foundError = ValidationService.getValidatorErrorMessage(
          validatorName,
          control.errors?.[validatorName]
        );

        break;
      }
    }

    // console.log({ control, foundError });
    // console.log('returning ->', { foundError });
    return foundError || '';
  }

  forgetPassword() {
    const email = this.validFormGroup.get('email')?.value!;

    console.log('email ->', email);
    this.userService.forgetPassword(email).subscribe((res) => {
      console.log('res ->', res);
      if (res) {


        this.goToConfirmationPage();

      }

    },
    (err) => {
      console.log('err ->', err);
      (err.error.message) ? this.validError = err.error.message : this.validError = 'Email not found';
    });


  }

  goToConfirmationPage() {
    this.router.navigate(['/validation-contact']);
  }
}
