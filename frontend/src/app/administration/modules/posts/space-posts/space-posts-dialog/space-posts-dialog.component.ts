import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, SimpleChanges, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogData } from '../space-posts.component';
import SpaceService from 'src/app/services/space.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { ThemePalette } from '@angular/material/core';
import {
  ValidationService,
  ValidationOption,
  VALIDATOR_NAMES,
} from 'src/app/services/validation.service';

@Component({
  selector: 'app-space-posts-dialog',
  templateUrl: './space-posts-dialog.component.html',
  styleUrls: ['./space-posts-dialog.component.scss'],
})
export class SpacePostsDialogComponent implements OnInit {
  public addSpaceFormGroup!: FormGroup;

  loading!: boolean;

  disabled: boolean = false;
  accept: string = 'image/*';

  fileControl: FormControl;

  public files: any;
  maxSize = 16;

  public listAccepts = [
    null,
    '.jpg',
    '.png',
    'image/*',
    '.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  constructor(
    public dialogRef: MatDialogRef<SpacePostsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router,
    private spaceService: SpaceService,
    private snackService: SnackBarService
  ) {
    this.fileControl = new FormControl(this.files, [
      Validators.required
    ]);
  }

  ngOnInit(): void {
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map((value) => this._filter(value || ''))
    // );

    this.fileControl.valueChanges.subscribe((files: any) => {
      if (!Array.isArray(files)) {
        this.files = [files];
      } else {
        this.files = files;
      }
    });

    this.addSpaceFormGroup = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]),
      meetingRoom: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(8),
      ]),
      callRoom: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(8),
      ]),

      image: this.fileControl,
    });
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

  createSpace() {
    if (!this.addSpaceFormGroup.valid) {
      this.addSpaceFormGroup.markAllAsTouched();
      return;
    }

    // console.log(this.addSpaceFormGroup.value);
    // return;
    const formData = new FormData();
    formData.append('description', this.addSpaceFormGroup.value.description);
    formData.append('title', this.addSpaceFormGroup.value.title);
    formData.append('callRoom', this.addSpaceFormGroup.value.callRoom);
    formData.append('meetingRoom', this.addSpaceFormGroup.value.meetingRoom);
    formData.append('image', this.files[0]?._files[0]);

    // console.log('form value: ', this.addSpaceFormGroup.value)
    this.spaceService.create(formData).subscribe((res) => {
      console.log('space creation res: ', res);
      this.dialogRef.close(true);

      this.snackService.openSnackBar('Création terminée avec succès !', 'Close');
      // window.location.reload();
    });
    // console.log('New space created !! :)')
  }
  //------------------------------------------------------------------------
  //   private _filter(value: string | SpaceModel): SpaceModel[] {
  //     if (typeof value === 'string') {
  //       const filterValue = value.toLowerCase();
  //       return this.data.spaceList.filter((spaceListItem) => {
  //         return spaceListItem.title.toLowerCase().includes(filterValue);
  //       });
  //     } else {
  //       return this.data.spaceList.filter((spaceListItem) => {
  //         if (spaceListItem.title === value.title) {
  //           this.selectedSpace = spaceListItem;
  //           this.myControl.setValue(spaceListItem.title);
  //           return true;
  //         }
  //         return false;
  //       });
  //     }
  // }

  getErrorMessage(field: string) {
    const control = this.addSpaceFormGroup.get(field)!;

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
