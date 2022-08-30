import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import UserModel from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import {
  ValidationService,
  VALIDATOR_NAMES,
} from 'src/app/services/validation.service';

@Component({
  selector: 'app-personal-email',
  templateUrl: './personal-email.component.html',
  styleUrls: ['./personal-email.component.scss'],
})
export class PersonalEmailComponent implements OnInit {
  public changeEmailInformation!: FormGroup;
  public changePasswordInformation!: FormGroup;
  validFormGroup!: FormGroup;
  passwordError = '';

  disabled: boolean = false;

  imageUrl: string = '';
  user: UserModel = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  };

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackService: SnackBarService
  ) {}

  // fetchDataForPassword(){

  //   // this.oldPassword = new FormControl('', [ Validators.required]);
  //   // this.newPassword = new FormControl('', [ Validators.required]);
  //   // this.confirmPassword = new FormControl('', [ Validators.required]);
  //   this.changePasswordInformation = new FormGroup({
  //     oldPassword: new FormControl('', [
  //       Validators.required,
  //     ]),
  //     newPassword: new FormControl('', [
  //       Validators.required,
  //     ]),

  //     validationPassword: new FormControl('', [
  //       Validators.required,
  //     ]),
  //   });

  // }

  ngOnInit(): void {
    const passwordMatchingValidation: ValidatorFn = (
      control: AbstractControl
    ): any | null => {
      // console.log('fonction execution passwordMatchingValidation');

      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');

      if (password?.value === confirmPassword?.value) {
        return null;
      }

      confirmPassword?.setErrors({ passwordNotMatched: true }); // https://angular.io/api/forms/AbstractControl#manually-set-the-errors-for-a-control
      return null;
    };

    this.fetchPageDataForEmail();

    this.changePasswordInformation = new FormGroup(
      {
        oldPassword: new FormControl('', [Validators.required]),
        password: new FormControl('', [
          Validators.minLength(5),
          Validators.required,
        ]),

        confirmPassword: new FormControl('', [Validators.required]),
      },
      passwordMatchingValidation
    );
  }

  modifyPassword() {
    console.log('modifyPassword');

    if (!this.changePasswordInformation.valid) {
      console.warn('CHange pass info is not valid');
      this.changePasswordInformation.markAllAsTouched();
      return;
    }

    console.log('after if change Inforamtions');

    console.log(
      'we are updating the following:',
      this.changePasswordInformation.value
    );
    this.userService
      .updateCurrentPassword(this.changePasswordInformation.value)
      .subscribe(
        (res) => {
          console.log('res -> ', res);
          this.snackService.openSnackBar('Password updated successfully', 'OK');
          this.changePasswordInformation.reset();
          // this.changePasswordInformation.markAsPristine();
          // this.changePasswordInformation.markAsUntouched();
          // this.changePasswordInformation.updateValueAndValidity();
          // this.changePasswordInformation.clearValidators();
          this.passwordError = '';
        },
        (err) => {
          console.log(err);
        this.snackService.openSnackBar(err.error.message, 'OK');
        }
      );
  }

  modifyCurrentEmail() {
    if (!this.changeEmailInformation.valid) {
      this.changeEmailInformation.markAllAsTouched();
      return;
    }

    const email = this.changeEmailInformation.value.email;

    const myData = {
      email,
    };

    this.userService.updateCurrentEmail(myData).subscribe(
      (res: any) => {
        console.log(res);
        this.user.email = myData.email;
        this.snackService.openSnackBar(res.message, 'OK');
        this.changeEmailInformation.reset();
      },
      (err) => {
        console.log(err);
        this.snackService.openSnackBar(err.error.message, 'OK');
      }
    );
  }

  fetchPageDataForEmail() {
    //
    this.changeEmailInformation = new FormGroup({
      email: new FormControl('', [
        // Validators.required,
        Validators.email,
      ]),
    });

    //

    this.authService.getUser().subscribe(
      (res) => {
        console.log('got the user -> ', res);
        const imageUrl = res.imageUrl || 'https://via.placeholder.com/300';
        this.imageUrl = imageUrl;
        this.user = res._doc;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  emailErrorMessage(field: string) {
    const control = this.changeEmailInformation.get(field)!;

    let foundError;

    for (let i = 0; i < VALIDATOR_NAMES.length; i++) {
      const validatorName = VALIDATOR_NAMES[i];
      if (control.hasError(validatorName)) {
        foundError = ValidationService.getValidatorErrorMessage(
          validatorName,
          control.errors?.[validatorName]
        );
        break;
      }
    }
    return foundError || '';
  }

  getErrorMessage(field: string) {
    const control = this.changePasswordInformation.get(field)!;

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
