import { Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

import SpaceModel from '../../../models/space.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Router } from '@angular/router';

import { DialogData } from 'src/app/components/reservations/reservations.component';

import SpaceService from 'src/app/services/space.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { HttpErrorResponse } from '@angular/common/http';
import ReservationService from 'src/app/services/reservation.service';


@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.scss'],
})
export class BookingDialogComponent implements OnInit {
  roomType = 'callRoom';
  roomsNumber = 0;
  // Auto complete exammple :
  myControl = new FormControl('');
  minDate: Date;
  maxDate: Date;
  startDate?: Date;
  endDate?: Date;
  FormData!: FormGroup;

  // @Input() spaceList: SpaceModel[] = [];
  filteredOptions: Observable<SpaceModel[]> | undefined;
  selectedSpace: SpaceModel | undefined;
  constructor(
    public dialogRef: MatDialogRef<BookingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router,
    private spaceService: SpaceService,
    private reservationService: ReservationService,
    private snackService: SnackBarService,
    private builder: FormBuilder
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 1, 11, 30);
  }

  ngOnInit() {
    this.maxDate = this.data.subscription.endDate;

    // console.log('wlh truk de ouf: ', this.data.spaceList)
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );


    // console.log(
    //   'we are in search bar, spaceList INITIAL VALUE is:',
    //   this.spaceList
    // );

    // console.log("this is MAT DIALOG", MAT_DIALOG_DATA);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        return this._filter(value || '');
      })
    );
    // console.log("this.filteredOptions -> ", this.filteredOptions)
  }

  private _filter(value: string | SpaceModel): SpaceModel[] {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();
      return this.data.spaceList.filter((spaceListItem) => {
        return spaceListItem.title.toLowerCase().includes(filterValue);
      });
    } else {
      return this.data.spaceList.filter((spaceListItem) => {
        if (spaceListItem.title === value.title) {
          this.selectedSpace = spaceListItem;
          this.myControl.setValue(spaceListItem.title);
          return true;
        }
        return false;
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectSpace(space: SpaceModel) {
    this.selectedSpace = space;
    // this.myControl.setValue(space.title);
  }

  sendReservation() {
    if(!this.startDate || !this.endDate) {
      this.snackService.openSnackBar('Please select a start and end date', 'OK');
      return;
    }
    if (
      !this.myControl.value ||
      this.myControl.value !== this.selectedSpace?.title
    ) {
      this.snackService.openSnackBar('Espace non valide', 'OK');
      return;
    }
    if (this.roomsNumber < 1) {
      this.snackService.openSnackBar('Le nombre ne peut être négatif', 'OK');
      return;
    }
    const reservation = {
      roomType: this.roomType,
      roomsNumber: this.roomsNumber,
      [this.roomType]: this.roomsNumber,
      startDate: this.startDate,
      endDate: this.endDate,
    };
    this.reservationService
      .sendReservation(this.selectedSpace._id, reservation)
      .subscribe(
        (res) => {
          console.log(res);
          this.snackService.openSnackBar('Réservation confimer, vous recevrez un email de confirmation sous peu', 'OK');
          this.router.navigate(['/reservations']);
          this.dialogRef.close();
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            this.snackService.openSnackBar(err.error.message, 'OK');
            return;
          }
          this.snackService.openSnackBar('Error sending reservation', 'OK');
        }
      );
  }


}
