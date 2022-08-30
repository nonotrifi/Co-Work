import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

import { IMaterialReservationInput } from 'src/app/interfaces/materialReservation.interface';
import { MaterialService } from 'src/app/services/material.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-personal-materials-spaces',
  templateUrl: './personal-materials-spaces.component.html',
  styleUrls: ['./personal-materials-spaces.component.scss'],
})
export class PersonalMaterialsSpacesComponent implements OnInit {
  dataSource: MatTableDataSource<IMaterialReservationInput>;

  public materialReservations: IMaterialReservationInput[] = [];

  public displayForm = false;

  posts: IMaterialReservationInput[];

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  // materials: IMaterial[];

  columnsToDisplay = [ 'materialId', 'quantity', 'date', 'actions'];

  constructor(
    private materialService: MaterialService,
    private activateRoute: ActivatedRoute,
    private snackBarService: SnackBarService
  ) {
    this.posts = [];
    this.dataSource = new MatTableDataSource(this.posts);
  }

  ngOnInit(): void {
    this.updateReservations()
  }

  updateReservations() {
    this.materialService
      .getPersonalReservationsMaterial()
      .subscribe((materialReservations) => {
        console.log(materialReservations);
        this.materialReservations = materialReservations;

        this.dataSource = new MatTableDataSource(this.materialReservations);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async onDelete(id: string) {
    this.materialService.deleteReservationMaterial(id).subscribe((res) => {
      this.updateReservations();
      this.snackBarService.openSnackBar('Suppression terminée avec succès', 'OK');
    });
  }
}
