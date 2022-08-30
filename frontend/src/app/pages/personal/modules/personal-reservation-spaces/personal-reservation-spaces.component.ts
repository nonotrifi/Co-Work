import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IUserPost } from 'src/app/interfaces/user.interface';
import SubscriptionEnum from 'src/app/enums/subscription.enum';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import UserModel from 'src/app/models/user.model';

import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { IReservation } from 'src/app/interfaces/reservation.interface';
import ReservationService from 'src/app/services/reservation.service';
import ReservationModel from 'src/app/models/reservation.model';
import { SnackBarService } from 'src/app/services/snack-bar.service';

export interface DialogData {
  reservationList: ReservationModel[];
}

@Component({
  selector: 'app-personal-reservation-spaces',
  templateUrl: './personal-reservation-spaces.component.html',
  styleUrls: ['./personal-reservation-spaces.component.scss'],
})
export class PersonalReservationSpacesComponent implements OnInit {
  dataSource: MatTableDataSource<IReservation>;

  public reservations: IReservation[] = [];
  public displayForm = false;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  posts: IReservation[];

  columnsToDisplay = [
    // 'id',
    // 'userId',
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
    this.posts = [];

    this.dataSource = new MatTableDataSource(this.posts);
  }

  ngOnInit(): void {
    this.updateReservations();
  }

  // getReservationById(id: string) {
  //   this.reservationService.getReservationById(id).subscribe(reservation => {
  //     this.reservations.push(reservation);
  //     this.dataSource = new MatTableDataSource(this.reservations);
  //     this.dataSource.sort = this.sort;
  //     this.dataSource.paginator = this.paginator;
  //   },

  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }

  updateReservations() {
    this.reservationService
      .getPersonalReservations()
      .subscribe((reservations) => {
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
      this.updateReservations();
      this.snackBarService.openSnackBar('Suppression terminée avec succès', 'OK');
    });
  }

  updateReservationById(id: string) {
    this.reservationService.getReservationById(id).subscribe(
      (reservation) => {
        this.reservations.push(reservation);
        this.dataSource = new MatTableDataSource(this.reservations);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
