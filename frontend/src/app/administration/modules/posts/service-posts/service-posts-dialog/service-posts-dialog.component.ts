
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Component, OnInit, Input, SimpleChanges, Inject } from '@angular/core';

import SpaceModel from 'src/app/models/space.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Router } from '@angular/router';

import { DialogData } from '../service-posts.component';

import SpaceService from 'src/app/services/space.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ThemePalette } from '@angular/material/core';

import { MaterialModule } from 'src/app/material/material.module';
import { ProposalService } from 'src/app/services/proposal.service';

import {
  ValidationService,
  ValidationOption,
  VALIDATOR_NAMES,
} from 'src/app/services/validation.service';

@Component({
  selector: 'app-service-posts-dialog',
  templateUrl: './service-posts-dialog.component.html',
  styleUrls: ['./service-posts-dialog.component.scss']
})
export class ServicePostsDialogComponent implements OnInit {

  public addServiceFormGroup!: FormGroup;



  loading!: boolean;

   color: ThemePalette = 'primary';
   disabled: boolean = false;
   accept: string= '';

  fileControl: FormControl;



  public files: any;
  maxSize= 16;

  public listAccepts = [
    null,
    ".jpg",
    ".png",
    "image/*",
    ".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];




  constructor(
    public dialogRef: MatDialogRef<ServicePostsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router,
    private proposalService: ProposalService,
    private snackService: SnackBarService
  ) {
    this.fileControl = new FormControl(this.files)
  }


  ngOnInit(): void {

    this.fileControl.valueChanges.subscribe((files: any) => {
      if (!Array.isArray(files)) {
        this.files = [files];
      } else {
        this.files = files;
      }
    })


    this.addServiceFormGroup = new FormGroup(
      {
        title: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
        ]),
        subTitle: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(150),
        ]),
        description: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ]),

        image: this.fileControl,

      },

    );

  }


  ngOnChanges(changes: SimpleChanges) {
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map((value) => {
    //     return this._filter(value || '');
    //   })
    // );
    // console.log("this.filteredOptions -> ", this.filteredOptions)
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  createService() {
    console.log("call");

    if(!this.addServiceFormGroup.valid) {
      this.addServiceFormGroup.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('title', this.addServiceFormGroup.value.title);
    formData.append('subTitle', this.addServiceFormGroup.value.subTitle);
    formData.append('description', this.addServiceFormGroup.value.description);
    formData.append('image', this.files[0]?._files[0]);

    this.proposalService.createProposal(formData).subscribe((res) => {
      this.snackService.openSnackBar('Service créé avec succès !', 'success');
      this.dialogRef.close();


    } , (err: HttpErrorResponse) => {
      this.snackService.openSnackBar(err.error.message, 'error');
    } );
  }


  getErrorMessage(field: string) {
    const control = this.addServiceFormGroup.get(field)!;

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
