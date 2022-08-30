import { Component, Inject, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { IMaterial } from 'src/app/interfaces/material.interface';
import MaterialModel from 'src/app/models/material.model';
import SpaceModel from 'src/app/models/space.model';
import { MaterialService } from 'src/app/services/material.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import SpaceService from 'src/app/services/space.service';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';
import { DialogData } from '../reservations.component';

@Component({
  selector: 'app-booking-material-dialog',
  templateUrl: './booking-material-dialog.component.html',
  styleUrls: ['./booking-material-dialog.component.scss'],
})
export class BookingMaterialDialogComponent implements OnInit {
  quantity = 1;
  myControl = new FormControl('');
  materialType?:IMaterial;
  materials: IMaterial[] = [];

  filteredOptions: Observable<SpaceModel[]> | undefined;
  selectedSpace: SpaceModel | undefined;
  // selectedMaterial: MaterialModel | undefined;

  constructor(
    public dialogRef: MatDialogRef<BookingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router,
    private materialService: MaterialService,
    private snackService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
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
      return this.data.spaceList.filter(async (spaceListItem) => {
        if (spaceListItem.title === value.title) {
          this.selectedSpace = spaceListItem;
          this.myControl.setValue(spaceListItem.title);
          this.materials =
            (await this.materialService
              .getBySpaceId(this.selectedSpace._id)
              .toPromise()) || [];
          return true;
        }
        return false;
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  reserveMaterial() {

    console.log('reserve Material function');
    console.log('all materials:', this.materials)
    console.log('this.selectedMaterial -> ', JSON.stringify(this.materialType));
    console.log('selectedSpace', this.selectedSpace);


    if(!this.materialType) {
      this.snackService.openSnackBar('Please select a material', 'OK');
      return;
    };

    if(!this.quantity) {
      this.snackService.openSnackBar('Please select a quantity', 'OK');
      return;
    };

    const reservationInfo = {
      materialId: this.materialType._id,
      // userId: this.data.userId,
      quantity: this.quantity,
    };

    console.log('launching reservation')
    this.materialService.reserve(reservationInfo).subscribe((res) => {

      this.snackService.openSnackBar('Réservation terminée avec succès', 'OK');
      this.dialogRef.close();
    }, (err)=>{

      console.error(err);
      this.snackService.openSnackBar(err.error.message, 'OK');
    });


  }

  // selectSpace(space: SpaceModel) {
  //   this.selectedSpace = space;
  //   // this.myControl.setValue(space.title);
  // }
}
