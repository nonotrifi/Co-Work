import { Component, OnInit } from '@angular/core';
import {
  Validators,
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validator,
  FormsModule,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  ValidationService,
  ValidationOption,
  VALIDATOR_NAMES,
} from 'src/app/services/validation.service';
import { MatDialog } from '@angular/material/dialog';
import { SignupPaymentComponent } from 'src/app/components/signup-payment/signup-payment.component';
import SubscriptionEnum from 'src/app/enums/subscription.enum';

type Engagement = {
  value: number;
  viewValue: string;
  subscription: SubscriptionEnum;
};
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  selectedPlan = null;
  paymentValid = false;
  selectedEngagement: Engagement | null = null;
  plans: Array<string> = ['Normal', 'Premium'];
  engagements: Array<Engagement> = [
    {
      value: 24,
      viewValue: 'monthly',
      subscription: SubscriptionEnum.NORMALMONTHLY,
    },
    {
      value: 20,
      viewValue: 'anually',
      subscription: SubscriptionEnum.NORMALANUALLY,
    },
  ];


  loginError: string | null = null;
  signUpFormGroup!: FormGroup;
  engagementDisabled = true;
  hide: boolean = true;


  constructor(
    private readonly authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {

    const passwordMatchingValidation: ValidatorFn = (
      control: AbstractControl
    ): any | null => {
      // console.log('fonction execution passwordMatchingValidation');

      const password = control.get('password');
      const confirmPassword = control.get('passwordConfirm');

      if (password?.value === confirmPassword?.value) {
        return null;
      }

      confirmPassword?.setErrors({ passwordNotMatched: true }); // https://angular.io/api/forms/AbstractControl#manually-set-the-errors-for-a-control
      return null;
    };

    this.signUpFormGroup = new FormGroup(
      {
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ]),
        email: new FormControl('', {
          validators: [Validators.required, Validators.email],
        }),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
        ]),
        passwordConfirm: new FormControl('', [Validators.required]),
      },
      passwordMatchingValidation
    );
  }

  register() {
    if (!this.paymentValid) {
      return;
    }
    const { firstName, lastName, email, password } = this.signUpFormGroup.value;
    this.authService
      .signUp({
        firstName,
        lastName,
        email,
        password,
        subscription:
          this.selectedEngagement?.subscription ||
          SubscriptionEnum.NORMALMONTHLY,
      })
      .subscribe(
        (data: any) => {
          console.log('data->', data);
          this.authService.setToken(data);
          this.router.navigate(['/payment']);
        },
        (error) => {
          console.log('error->', error);
          this.loginError = error.error.message;
        }
      );
  }

  // this.userForm = this.formBuilder.group({
  //   name: ['', Validators.required],
  //   email: ['', [Validators.required, ValidationService.emailValidator]],
  //   profile: ['', Validators.required]
  // });

  getErrorMessage(field: string) {
    const control = this.signUpFormGroup.get(field)!;

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

    /*
    if (control.hasError('required')) {
      return 'You must enter a value';
    }
    if (control.hasError('email')) {
      return 'Not a valid email';
    }
    if(control.hasError('firstname')) {
      return 'Must be between 5 and 25 charachters';
    }
    if (control.hasError('password')) {
      return 'Password must be at least 5 characters long';
    }

    return ''; */
  }

  // login() {
  //   this.loginFormGroup.markAllAsTouched();
  //   if (this.loginFormGroup.valid) {
  //     const email = this.loginFormGroup.get('email')?.value!;
  //     const password = this.loginFormGroup.get('password')?.value!;
  //     this.authService.login(email, password).subscribe({
  //       next: (token) => {
  //         console.log(token);
  //         this.authService.setToken(token);
  //       this.router.navigate(['/'])
  //       },
  //       error: (err) => {
  //         console.error(err);
  //         this.loginFormGroup.controls.password.reset();
  //         this.loginFormGroup.get('password')?.setErrors({
  //           invalid: true,
  //         });
  //         this.loginError = err.error.message;

  //       },
  //     });
  //     console.log('login');
  //   }
  // }

  equalPassword(): void {}

  openPaymentDialog() {
    const dialogRef = this.dialog.open(SignupPaymentComponent, {
      // width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  changeEngagement() {
    this.paymentValid = false;
    if (this.selectedPlan === this.plans[0]) {
      this.engagements = [
        {
          value: 24,
          viewValue: 'monthly',
          subscription: SubscriptionEnum.NORMALMONTHLY,
        },
        {
          value: 20,
          viewValue: 'anually',
          subscription: SubscriptionEnum.NORMALANUALLY,
        },
      ];
    } else {
      this.engagements = [
        {
          value: 300,
          viewValue: 'monthly',
          subscription: SubscriptionEnum.PREMIUMMONTHLY,
        },
        {
          value: 252,
          viewValue: '8 month',
          subscription: SubscriptionEnum.PREMIUMANUALLY,
        },
      ];
    }
    this.engagementDisabled = false;
  }
}
