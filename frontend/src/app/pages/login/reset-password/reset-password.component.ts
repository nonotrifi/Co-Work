import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import {
  ValidationService,
  VALIDATOR_NAMES,
} from 'src/app/services/validation.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  validError: string | null = null;
  validFormGroup!: FormGroup;
  hide: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public userService: UserService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    const passwordMatchingValidation: ValidatorFn = (
      control: AbstractControl
    ): any | null => {
      // console.log('fonction execution passwordMatchingValidation');

      const password = control.get('password');
      const passwordConfirm = control.get('passwordConfirm');

      if (password?.value === passwordConfirm?.value) {
        return null;
      }

      passwordConfirm?.setErrors({ passwordNotMatched: true }); // https://angular.io/api/forms/AbstractControl#manually-set-the-errors-for-a-control
      return null;
    };

    this.validFormGroup = new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(5)],
        }),
        passwordConfirm: new FormControl('', {
          validators: [Validators.required],
        }),
        // passwordMatchingValidation/
      },
      passwordMatchingValidation
    );

    this.activatedRoute.params.subscribe(
      (params) => {
        const token = params['resetToken'];
        console.log('token is here => ', token);

        if (!token) {
          this.router.navigate(['/']);
        }
      },
      (error) => {
        console.error('error', error);
        this.validError = 'Invalid password';
      }
    );
  }

  async validatePassword() {
    this.validFormGroup.markAllAsTouched();

    if (this.validFormGroup.valid) {
      const password = this.validFormGroup.get('password')?.value!;
      const passwordConfirm = this.validFormGroup.get('password')?.value!;
      if (password === passwordConfirm) {
      } else {
        this.validError = 'Passwords do not match';
      }
    }
  }

  async resetPassword() {
    console.log('resetPassword');
    console.log('password', this.validFormGroup.get('password')?.value);
    console.log('password', this.validFormGroup.get('passwordConfirm')?.value);

    const password = this.validFormGroup.get('password')?.value!;
    const passwordConfirm = this.validFormGroup.get('passwordConfirm')?.value!;
    const resetToken = this.activatedRoute.snapshot.params['resetToken'];
    if (password === passwordConfirm) {
      console.log('password === passwordConfirm');
      // https://linuxpip.org/auto-indent-vscode/
      this.userService.resetPassword(resetToken, password).subscribe(
        (result) => {
          console.log('result', result);
          this.snackBarService.openSnackBar('Votre mot de passe a été modifié', 'ok');
          this.router.navigate(['/login']);

        },
        (error) => {
          console.error('error', error);
          this.snackBarService.openSnackBar('Vous n\'avez pas rentrer les bonnes valeurs', 'ok');
          this.validError = error.error.message;
        }
      );
    } else {
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
    return foundError || '';
  }
}
