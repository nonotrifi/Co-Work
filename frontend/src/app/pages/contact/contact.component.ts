import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  Validators,
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validator,
  FormsModule,
  NgForm
} from '@angular/forms';
import { Router } from '@angular/router';
import { SendEmailService } from 'src/app/services/send-email.service';

import {
  ValidationService,
  ValidationOption,
  VALIDATOR_NAMES,
} from 'src/app/services/validation.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  // email!: string;
  // userMessage!: string;
  // name!: string;
  // phone!: string;

  FormData!: FormGroup;

  constructor(
    private builder: FormBuilder,
    private http: HttpClient,
     private emailService: SendEmailService,
      private router: Router) { }

  ngOnInit(): void {
    this.FormData = this.builder.group({
      nameFormControl: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)]),

      textAreaFormControl: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(250)]),

        email: new FormControl('', [
        Validators.required, Validators.email]),

      phoneFormControl: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(15)])
    })
  }

  onSubmitForm(): void {
    window.alert('Souhaitez-vous valider ses données')
    // console.log('form data ->', this.FormData.value);
    const monObject = {
       destinationEmail:  this.FormData.value['email'],
       subject: this.FormData.value['phoneFormControl'],
       text: this.FormData.value['nameFormControl'],
       fromEmail: this.FormData.value['email'],
       html: this.FormData.value['textAreaFormControl']} ; // data mapping


    console.log("monObject : => ", monObject);

    // subscribe -> retourne next + error ()
    this.emailService.sendEmailContact(monObject).subscribe({
          next: () => {
              console.log("Contact send it to Admin");

          },
          error: (err) => {
            console.error(err);

          }
    });
  }


  goToConfirmationPage() {
    this.router.navigate(['/contact/confirmation']);
  }

  getErrorMessage(field: string) {
    const control = this.FormData.get(field)!;

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
