import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { IReservation } from 'src/app/interfaces/reservation.interface';
import ReservationService from 'src/app/services/reservation.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-reservation-spaces-admin',
  templateUrl: './reservation-spaces-admin.component.html',
  styleUrls: ['./reservation-spaces-admin.component.scss']
})
export class ReservationSpacesAdminComponent implements OnInit {

  dataSource: MatTableDataSource<IReservation>;

  public reservations: IReservation[] = [];
  public displayForm = false;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  posts: IReservation[];

  columnsToDisplay = [
    // 'id',
    'userId',
    'spaceId',
    'startDate',
    'endDate',
    'meeetingRoom',
    'callRoom',
    'actions',
  ];
  constructor(
    private reservationService: ReservationService,
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
    this.reservationService.getAllReservations().subscribe((reservations) => {
      console.log(reservations);
      this.reservations = reservations;
      this.dataSource = new MatTableDataSource(this.reservations);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async onDelete(id: string) {

    this.reservationService.deleteReservation(id).subscribe((res) => {
      if (res) {
        this.updateReservations();
        this.snackBarService.openSnackBar('Suppression terminée avec succèes !', 'OK');
      } else {
        this.snackBarService.openSnackBar('Error', 'OK');
      }

    });
  }

}
