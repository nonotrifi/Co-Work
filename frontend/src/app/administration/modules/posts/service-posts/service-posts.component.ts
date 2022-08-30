import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import {IService} from 'src/app/interfaces/service.interface';

import ProposalModel from 'src/app/models/proposal.model';
import { ProposalService } from 'src/app/services/proposal.service';
// import { SnackBarService } from 'src/app/services/snack-bar.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { ServicePostsDialogComponent } from './service-posts-dialog/service-posts-dialog.component';


export interface DialogData {
  serviceList: ProposalModel[];
}

@Component({
  selector: 'app-service-posts',
  templateUrl: './service-posts.component.html',
  styleUrls: ['./service-posts.component.scss']
})


export class ServicePostsComponent implements OnInit {

  dataSource!: MatTableDataSource<IService>;

  public services: IService[] = [];


  public displayForm = false;
  columsToDisplay = ['title', 'subTitle', 'description', 'image', 'actions'];



  @Input() serviceList: ProposalModel[] | null = [];

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;


  constructor(
    private proposalService: ProposalService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: SnackBarService
    // private snackBar: SnackBarService
    ) {

     }

    ngOnInit(): void {
      this.updateServices();

    }

    updateServices(): void {
    this.proposalService.getAllProposals().subscribe((services) => {
      this.services = services;
      // console.log('getSpaces ', spaces)
      this.dataSource = new MatTableDataSource(this.services);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
    }


    openDialog(): void {
      const dialogRef = this.dialog.open(ServicePostsDialogComponent, {
       //  width: '450px',
         data: 'right click',
       });

       dialogRef.afterClosed().subscribe(result => {

            this.updateServices();

        }
      );

     }

     onDelete(service: IService) {
      this.proposalService.deleteServiceById(service._id).subscribe((res) => {
        // console.log('Deletion successful !')
       this.updateServices();
       this.snackBar.openSnackBar('Suppression terminée avec succès !', 'OK');
      })
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
