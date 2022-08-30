import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from 'src/app/interfaces/event.interface';
import { IEventReservationInput } from 'src/app/interfaces/eventReservation.interface';
import { IReservation } from 'src/app/interfaces/reservation.interface';
import EventService from 'src/app/services/event.service';
import ReservationService from 'src/app/services/reservation.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-reservation-events-admin',
  templateUrl: './reservation-events-admin.component.html',
  styleUrls: ['./reservation-events-admin.component.scss']
})
export class ReservationEventsAdminComponent implements OnInit {

  dataSource: MatTableDataSource<IEventReservationInput>;

  public reservations: IEventReservationInput[] = [];
  public displayForm = false;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  posts: IEventReservationInput[];

  columnsToDisplay = [
    // 'id',
    'userId',
    'event',
    'title',
    'actions',
  ];
  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private snackBarService: SnackBarService
  ) {
    this.posts = [
      // {
      //   _id: '5',
      //   userId: '1',
      //   spaceId: '1',
      //   startDate: new Date(),
      //   endDate: new Date(),
      //   meeetingRoom: '1',
      //   callRoom: '1',
      // },
      // {
      //   _id: '5',
      //   userId: '4',
      //   spaceId: '46',
      //   startDate: new Date(),
      //   endDate: new Date(),
      //   meeetingRoom: '1',
      //   callRoom: '3',
      // },
    ];

    this.dataSource = new MatTableDataSource(this.posts);
  }

  ngOnInit(): void {
    this.updateReservations();
  }

  updateReservations() {
    this.eventService.getEventReservations().subscribe((reservations) => {
      console.log("reservations " ,reservations);

      this.reservations = reservations;
      this.dataSource = new MatTableDataSource(this.reservations);
      this.dataSource.sort = this.sort;
      this.dataSource.data = this.reservations;
    }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async onDelete(id: string) {
    this.eventService.deletEventReservation(id).subscribe((res) => {
      if(res) {
        this.updateReservations();
        this.snackBarService.openSnackBar('Suppression terminée avec succèes !', 'OK');
      }
      else  {
        this.snackBarService.openSnackBar('Error', 'OK');
      }
    });
  }

}
