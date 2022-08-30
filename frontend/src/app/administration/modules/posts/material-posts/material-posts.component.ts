import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IMaterial } from 'src/app/interfaces/material.interface';
import { MaterialService } from 'src/app/services/material.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { MaterialPostsDialogComponent } from './material-posts-dialog/material-posts-dialog.component';

@Component({
  selector: 'app-material-posts',
  templateUrl: './material-posts.component.html',
  styleUrls: ['./material-posts.component.scss']
})
export class MaterialPostsComponent implements OnInit {

  dataSource: MatTableDataSource<IMaterial>;

  public materials: IMaterial[] = [];
  public displayForm = false;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  posts: IMaterial[] = [];

  columnsToDisplay = [ 'name', 'limit', 'space','actions'];

  constructor(
    public dialog: MatDialog,
    private materialService: MaterialService,
    private snackBarService: SnackBarService
  ) {
    this.dataSource = new MatTableDataSource(this.posts);
  }

  ngOnInit(): void {
    this.updateMaterials();
  }

  updateMaterials() {
    this.materialService.getAll().subscribe((materials) => {
      console.log(materials);
      this.materials = materials;
      this.dataSource = new MatTableDataSource(this.materials);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async onDelete(id: string) {
    this.materialService.delete(id).subscribe((res) => {
      this.snackBarService.openSnackBar('Suppression terminée avec succès','Ok');
      this.updateMaterials();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MaterialPostsDialogComponent, {
      //  width: '450px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.updateMaterials();
      }
    });
  }

}
