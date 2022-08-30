import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { IEventReservationInput } from 'src/app/interfaces/eventReservation.interface';
import EventService from 'src/app/services/event.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-personal-events-spaces',
  templateUrl: './personal-events-spaces.component.html',
  styleUrls: ['./personal-events-spaces.component.scss'],
})
export class PersonalEventsSpacesComponent implements OnInit {
  dataSource: MatTableDataSource<IEventReservationInput>;

  public eventReservations: IEventReservationInput[] = [];
  public displayForm = false;

  reservations: IEventReservationInput[];



  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;


  columnsToDisplay = [ 'eventId', 'spaceId', 'actions'];


  constructor(
    private eventService: EventService,
    private SnackBarService: SnackBarService)

    {

    this.reservations = [];
    this.dataSource = new MatTableDataSource(this.reservations);
  }


  ngOnInit(): void {
    this.updateReservations();
  }



  updateReservations() {
    this.eventService
      .getPersonalEventReservations()
      .subscribe((enventReservations) => {
        console.log( "eventReservations => " , enventReservations);
        this.eventReservations = enventReservations;


        this.dataSource = new MatTableDataSource(this.eventReservations);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(id: string) {
    this.eventService.deletEventReservation(id).subscribe((res) => {
      this.updateReservations();
      this.SnackBarService.openSnackBar('Suppression terminée avec succès', 'OK');
    });
  }


}
