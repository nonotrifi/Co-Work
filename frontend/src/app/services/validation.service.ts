import { HasTabIndex } from "@angular/material/core";

export type ValidationOption = 'required' | 'invalidCreditCard' |
'email' |'password' | 'minlength' | 'firstname'
|'passwordConfirm'| 'passwordNotMatched' |
 'nameFormControl' | 'phoneFormControl' | 'textAreaFormControl' | 'maxlength' ;


export const VALIDATOR_NAMES: ValidationOption[] = [
  'nameFormControl',
  'phoneFormControl',
  'textAreaFormControl',
  'required',
  'invalidCreditCard',
  'email',
  'password',
  'minlength',
  'maxlength',
  'firstname',
  'passwordConfirm',
  'passwordNotMatched',

];

export class ValidationService {
  static getValidatorErrorMessage(validatorName: ValidationOption, validatorValue?: any ) {
    const config = {
      nameFormControl: 'Name is not valid',
      phoneFormControl: 'Phone number not valid',
      required: 'Champ requis',
      invalidCreditCard: 'Numéro de carte bancaire invalide',
      email: 'L\'email n\'est pas au bon format',
      password:
        'Invalid password. Password must be at least 6 characters long, and contain a number.',
      minlength: `Il faut au moins ${validatorValue ? validatorValue.requiredLength : 'UNKNOWN'} caractères.`,
      maxlength: `Il faut maximum ${validatorValue ? validatorValue.requiredLength : 'UNKNOWN'} caractères.`,
      firstname: 'Le prénom n\'est pas valide',
      lastname: 'Le nom n\'est pas valide',
      passwordConfirm: 'Le mot de passe ne correspond pas',
      passwordNotMatched: 'Le mot de passe ne correspond pas',
      textAreaFormControl: 'Le texte n\est pas valide',

    };

    return config[validatorName];

  }


  static passwordValidator(control: { value: string; }) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { invalidPassword: true };
    }
  }
}
