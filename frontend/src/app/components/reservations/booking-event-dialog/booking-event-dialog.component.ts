import { Component, Inject, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { IEvent } from 'src/app/interfaces/event.interface';
import EventModel from 'src/app/models/event.model';
import SpaceModel from 'src/app/models/space.model';
import EventService from 'src/app/services/event.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import SpaceService from 'src/app/services/space.service';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';
import { DialogData } from '../reservations.component';

@Component({
  selector: 'app-booking-event-dialog',
  templateUrl: './booking-event-dialog.component.html',
  styleUrls: ['./booking-event-dialog.component.scss'],
})
export class BookingEventDialogComponent implements OnInit {
  myControl = new FormControl('');
  eventType?: IEvent;
  filteredOptions: Observable<SpaceModel[]> | undefined;
  events: EventModel[] = [];
  filteredEvents: EventModel[] = [];
  selectedSpace: SpaceModel | undefined;
  selectedEvent: EventModel | undefined;
  spaceAll: SpaceModel = {
    _id: '',
    description: 'all',
    image: '',
    title: 'All spaces',
  };
  constructor(
    public dialogRef: MatDialogRef<BookingEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router,
    private spaceService: SpaceService,
    private snackService: SnackBarService,
    private eventService: EventService
  ) {}

  async ngOnInit(): Promise<void> {
    const events = await this.eventService.getAllEvents(true).toPromise();
    this.events = [...(events || [])];
    this.filteredEvents = [...(events || [])];
    const newSpaces = [this.spaceAll, ...this.data.spaceList];
    this.data.spaceList = newSpaces;
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
    if (
      (typeof value === 'string' && value === this.spaceAll.title) ||
      (value instanceof SpaceModel && value.title === this.spaceAll.title)
    ) {
      this.selectedSpace = undefined;
      this.filteredEvents = [...this.events];
      return this.data.spaceList;
    }
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();
      return this.data.spaceList.filter((spaceListItem) => {
        return spaceListItem.title.toLowerCase().includes(filterValue);
      });
    } else {
      return this.data.spaceList.filter((spaceListItem) => {
        if (spaceListItem.title === value.title) {
          this.selectedSpace = spaceListItem;
          this.filteredEvents = this.events.filter((event) => {
            if (typeof event.spaceId !== 'string') {
              return event.spaceId._id === this.selectedSpace?._id;
            }
            return false;
          });
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

  // selectSpace(space: SpaceModel) {
  //   this.selectedSpace = space;
  //   // this.myControl.setValue(space.title);
  // }

  reserveEvent() {

    const reservationInfo = {
      eventId: this.selectedEvent?._id as string,
      spaceId: this.selectedSpace?._id as string,
      eventType: this.eventType,
    }
    console.log("reservationInfo -> ", reservationInfo);

    if (!this.selectedEvent) {
      this.snackService.openSnackBar('Tu dois sélectionner un évènement !', 'Ok');
      return;
    }
    this.eventService.makeEventReservation(reservationInfo).subscribe((res) => {
      this.snackService.openSnackBar('Réservation terminée avece succès !', 'Ok');
      this.dialogRef.close();
    },
    (err) => {


      this.snackService.openSnackBar(err.error.message, 'Ok');
    }
    );
  }
}
