import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IEvent } from 'src/app/interfaces/event.interface';
import { ActivatedRoute } from '@angular/router';
import EventService from 'src/app/services/event.service';
import EventModel from 'src/app/models/event.model';
import { MatDialog } from '@angular/material/dialog';
import { EventPostsDialogComponent } from './event-posts-dialog/event-posts-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import {SnackBarService} from 'src/app/services/snack-bar.service';

export interface DialogData {
  eventList: EventModel[];
}

@Component({
  selector: 'app-event-posts',
  templateUrl: './event-posts.component.html',
  styleUrls: ['./event-posts.component.scss'],
})
export class EventPostsComponent implements OnInit {
  dataSource!: MatTableDataSource<IEvent>;

  public events: IEvent[] = [];
  public displayForm = false;

  columsToDisplay = [ 'title', 'description', 'image','titleSpace', 'actions'];

  @Input() eventList: EventModel[] | null = [];

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private readonly eventService: EventService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: SnackBarService
  ) {}



  ngOnInit(): void {
    this.updateEvents();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  updateEvents(): void {
    this.eventService.getAllEvents().subscribe((events) => {
      this.events = events;
      // console.log('getEvents ', events)

      this.dataSource = new MatTableDataSource(this.events);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

    // -------------------------------------------------------------- Dialog  --------------------------------------------------------------
    openDialog(): void {
      const dialogRef = this.dialog.open(EventPostsDialogComponent, {
        //  width: '450px',
        data: 'right click',
      });
      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          this.updateEvents();
        }
      });
    }



  onDelete(event: IEvent) {
    this.eventService.deleteEventById(event._id).subscribe((res) => {
      console.log('Suppression terminée avec succès !')
      // window.location.reload();
     this.updateEvents();
      this.snackBar.openSnackBar('Suppression terminée avec succès !', 'Close');
    });
  }


}
