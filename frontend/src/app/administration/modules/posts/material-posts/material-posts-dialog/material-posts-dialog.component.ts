import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import SpaceService from 'src/app/services/space.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import SpaceModel from 'src/app/models/space.model';
import { map, Observable, startWith } from 'rxjs';
import EventService from 'src/app/services/event.service';
import { MaterialService } from 'src/app/services/material.service';
import {
  ValidationService,
  ValidationOption,
  VALIDATOR_NAMES,
} from 'src/app/services/validation.service';

@Component({
  selector: 'app-material-posts-dialog',
  templateUrl: './material-posts-dialog.component.html',
  styleUrls: ['./material-posts-dialog.component.scss']
})
export class MaterialPostsDialogComponent implements OnInit {
  public addEventFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25),
    ]),
    limit: new FormControl('', [Validators.required, Validators.min(1)]),
  });
  filteredOptions: Observable<SpaceModel[]> | undefined;
  selectedSpace: SpaceModel | undefined;
  loading!: boolean;
  roomControl: FormControl;
  disabled: boolean = false;

  spaceList: SpaceModel[] = [];

  maxSize = 16;

  constructor(
    public dialogRef: MatDialogRef<MaterialPostsDialogComponent>,
    private spaceService: SpaceService,
    private snackService: SnackBarService,
    private materialService: MaterialService
  ) {
    this.roomControl = new FormControl('', [Validators.required]);
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

    this.addEventFormGroup = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),
      limit: new FormControl('', [Validators.required, Validators.min(1)]),
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
  ngOnChanges(changes: SimpleChanges) {
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

  createMaterial() {
    if (!this.addEventFormGroup.valid) {
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
    const material = {
      name: this.addEventFormGroup.value.name,
      limit: this.addEventFormGroup.value.limit,
      spaceId: this.selectedSpace?._id
    }
    // const formData = new FormData();
    // formData.append('name', this.addEventFormGroup.value.name);
    // formData.append('title', this.addEventFormGroup.value.title);
    // formData.append('spaceId', this.selectedSpace?._id || '');

    this.materialService.create(material).subscribe((res) => {
      console.log('material creation res: ', res);
      this.snackService.openSnackBar('Matériel créé avec succès!', 'Ok');
      this.dialogRef.close(true);
    });
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
