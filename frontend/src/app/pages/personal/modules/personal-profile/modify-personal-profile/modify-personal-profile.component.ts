import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import UserModel from 'src/app/models/user.model';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { UserService } from 'src/app/services/user.service';
import { DialogData } from '../personal-profile.component';
import { IUpdateCurrentUser } from 'src/app/interfaces/updateCurrentUser.interface';
import {
  ValidationService,
  ValidationOption,
  VALIDATOR_NAMES,
} from 'src/app/services/validation.service';

@Component({
  selector: 'app-modify-personal-profile',
  templateUrl: './modify-personal-profile.component.html',
  styleUrls: ['./modify-personal-profile.component.scss']
})
export class ModifyPersonalProfileComponent implements OnInit {

  public changePersonalInformations!: FormGroup;

  disabled: boolean = false;


  imageUrl: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModifyPersonalProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackService: SnackBarService,
    private userService: UserService
  ) { }



  ngOnInit(): void {


    this.changePersonalInformations =  new FormGroup({
      firstName: new FormControl('', [
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.required,
      ]),
      lastName: new FormControl('', [
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.required,
      ]),
    })
  }



  onNoClick(): void {
    this.dialogRef.close();
  }

  ModifyPersonalInformations() {
    if(!this.changePersonalInformations.valid) {
     this.changePersonalInformations.markAllAsTouched();
     return;
    }

    const firstName: string = this.changePersonalInformations.value.firstName;
    const lastName: string = this.changePersonalInformations.value.lastName;
    const myData = {
      firstName,
      lastName,
      // email: this.data.email,
      // password: this.data.password,
    };

    console.log("myData => ", myData);
      this.userService.updateCurrentUser(myData).subscribe(
      (data) => {
        this.snackService.openSnackBar('Modification effectuée avec succès', 'Ok');
        this.dialogRef.close();
      },
      (error) => {
        console.log("error", error);
        this.snackService.openSnackBar('Erreur lors de la modification', 'Ok');
      }
    )
  }


  getErrorMessage(field: string) {
    const control = this.changePersonalInformations.get(field)!;

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
