import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, SimpleChanges, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogData } from '../event-posts.component';
import SpaceService from 'src/app/services/space.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { ThemePalette } from '@angular/material/core';
import SpaceModel from 'src/app/models/space.model';
import { map, Observable, startWith } from 'rxjs';
import EventService from 'src/app/services/event.service';
import {
  ValidationService,
  ValidationOption,
  VALIDATOR_NAMES,
} from 'src/app/services/validation.service';
@Component({
  selector: 'app-event-posts-dialog',
  templateUrl: './event-posts-dialog.component.html',
  styleUrls: ['./event-posts-dialog.component.scss'],
})
export class EventPostsDialogComponent implements OnInit {
  public addEventFormGroup: FormGroup = new FormGroup({
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
  });
  filteredOptions: Observable<SpaceModel[]> | undefined;
  selectedSpace: SpaceModel | undefined;
  loading!: boolean;
  roomControl: FormControl;
  disabled: boolean = false;
  accept: string = 'image/*';

  spaceList: SpaceModel[] = [];

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
    public dialogRef: MatDialogRef<EventPostsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router,
    private spaceService: SpaceService,
    private snackService: SnackBarService,
    private eventService: EventService
  ) {
    this.fileControl = new FormControl(this.files, [Validators.required]);
    this.roomControl = new FormControl(
      '', [Validators.required, Validators.min(1)]);
  }

  async getSpaces() {
    const res = await this.spaceService.getAllSpaces().toPromise();
    this.spaceList = res || [];
  }

  async ngOnInit(): Promise<void> {
    await this.getSpaces();

    this.filteredOptions = this.roomControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

    this.fileControl.valueChanges.subscribe((files: any) => {
      if (!Array.isArray(files)) {
        this.files = [files];
      } else {
        this.files = files;
      }
    });

    this.addEventFormGroup = new FormGroup({
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

      image: this.fileControl,

      room: this.roomControl,
    });
  }

  private _filter(value: string | SpaceModel): SpaceModel[] {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();
      return this.spaceList.filter((spaceListItem) => {
        return spaceListItem.title.toLowerCase().includes(filterValue);
      });
    } else {
      return this.spaceList.filter((spaceListItem) => {
        if (spaceListItem.title === value.title) {
          this.selectedSpace = spaceListItem;
          this.roomControl.setValue(spaceListItem.title);
          return true;
        }
        return false;
      });
    }
  }
  // File {name: 'w6.jpg', lastModified: 1659110732191, lastModifiedDate: Fri Jul 29 2022 18:05:32 GMT+0200 (heure d’été d’Europe centrale), webkitRelativePath: '', size: 1217827, …}
  ngOnChanges(changes: SimpleChanges) {
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map((value) => {
    //     return this._filter(value || '');
    //   })
    // );
    // console.log("this.filteredOptions -> ", this.filteredOptions)
    this.filteredOptions = this.roomControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        return this._filter(value || '');
      })
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createEvent() {
    if (!this.addEventFormGroup.valid) {
      console.log('here');

      this.addEventFormGroup.markAllAsTouched();
      return;
    }
    if (
      !this.roomControl.value ||
      this.roomControl.value !== this.selectedSpace?.title
    ) {
      this.snackService.openSnackBar('Espace non valide', 'OK');
      return;
    }
    const formData = new FormData();
    formData.append('description', this.addEventFormGroup.value.description);
    formData.append('title', this.addEventFormGroup.value.title);
    formData.append('spaceId', this.selectedSpace?._id || '');
    console.log('event posts FILE TYPE -> ', this.files[0]?._files[0]);
    formData.append('image', this.files[0]?._files[0]);

    // console.log('form value: ', this.addSpaceFormGroup.value)
    this.eventService.create(formData).subscribe((res) => {
      console.log('space creation res: ', res);
      this.snackService.openSnackBar('Evènement crée avec succès', 'OK');

      this.dialogRef.close(true);

    });
    // console.log('New space created !! :)')
  }

  getErrorMessage(field: string) {
    const control = this.addEventFormGroup.get(field)!;

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
