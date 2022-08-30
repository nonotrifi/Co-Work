import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ISpace } from 'src/app/interfaces/space.interface';
import { ActivatedRoute } from '@angular/router';
import SpaceService from 'src/app/services/space.service';
import SpaceModel from 'src/app/models/space.model';
import { MatDialog } from '@angular/material/dialog';
import { SpacePostsDialogComponent } from './space-posts-dialog/space-posts-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SnackBarService } from 'src/app/services/snack-bar.service';

export interface DialogData {
  spaceList: SpaceModel[];
}

@Component({
  selector: 'app-space-posts',
  templateUrl: './space-posts.component.html',
  styleUrls: ['./space-posts.component.scss'],
})
export class SpacePostsComponent implements OnInit {
  dataSource!: MatTableDataSource<ISpace>;

  public spaces: ISpace[] = [];
  public displayForm = false;

  columsToDisplay = [ 'title', 'description', 'image', 'actions'];

  @Input() spaceList: SpaceModel[] | null = [];

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private readonly spaceService: SpaceService,
    private activatedRoute: ActivatedRoute,
    private snackBar: SnackBarService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.updateSpaces();
  }

  updateSpaces(): void {
    this.spaceService.getAllSpaces().subscribe((spaces) => {
      this.spaces = spaces;
      this.dataSource = new MatTableDataSource(this.spaces);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  // -------------------------------------------------------------- Dialog  --------------------------------------------------------------
  openDialog(): void {
    const dialogRef = this.dialog.open(SpacePostsDialogComponent, {
      //  width: '450px',
      data: 'right click',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.updateSpaces();
      }
      // console.log('The dialog was closed');
    });
  }

  // --------------------------------------------------------------------------------------------------------------------------

  onDelete(space: ISpace) {
    this.spaceService.deleteSpaceById(space._id || '').subscribe((res) => {
      this.updateSpaces();
      this.snackBar.openSnackBar('Suppression terminée avec succès !', 'OK');
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
