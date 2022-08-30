import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { BookingDialogComponent } from 'src/app/components/reservations/booking-dialog/booking-dialog.component';
import SpaceModel from '../../models/space.model';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Router } from '@angular/router';
import { __values } from 'tslib';
import { Dialog, DIALOG_DATA } from '@angular/cdk/dialog';
import SubscriptionModel from 'src/app/models/subscription.model';
import { BookingEventDialogComponent } from './booking-event-dialog/booking-event-dialog.component';
import { BookingMaterialDialogComponent } from './booking-material-dialog/booking-material-dialog.component';

export interface DialogData {
  spaceList: SpaceModel[];
  subscription: SubscriptionModel;
}

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
})
export class ReservationsComponent implements OnInit {
  @Input() spaceList: SpaceModel[] | null = [];
  @Input() subscription: SubscriptionModel | null = null;
  imgaeUrl! : string;




  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    // console.log("Mat dialog DATA", MAT_DIALOG_DATA);
    // console.log('reservations.component spaceList: ', this.spaceList)
    this.imgaeUrl = 'uploads/reservations.png';
  }

  openSpaceDialog(): void {
    if (this.spaceList && this.spaceList.length > 0) {
      const dialogRef = this.dialog.open(BookingDialogComponent, {
        // width: '450px',
        // height: '500px',
        data: { spaceList: this.spaceList, subscription: this.subscription },
      });

      dialogRef.afterClosed().subscribe((result) => {
        // console.log('The dialog was closed');
      });
    }
  }


  openEventDialog(): void {
    const dialogRef = this.dialog.open(BookingEventDialogComponent, {
      // width: '450px',
      // height: '500px',
      data: { spaceList: this.spaceList, subscription: this.subscription },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
    }
    );
  }


  openMaterialDialog(): void {
    const dialogRef = this.dialog.open(BookingMaterialDialogComponent, {
      // width: '450px',
      // height: '500px',
      data: { spaceList: this.spaceList, subscription: this.subscription },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
    }
    );
  }
}
