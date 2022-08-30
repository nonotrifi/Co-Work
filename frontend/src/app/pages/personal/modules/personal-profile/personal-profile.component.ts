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
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ModifyPersonalProfileComponent } from './modify-personal-profile/modify-personal-profile.component';
import { DeletePersonalProfileComponent } from './delete-personal-profile/delete-personal-profile.component';


export interface DialogData {
  userList: UserModel[];
}


@Component({
  selector: 'app-personal-profile',
  templateUrl: './personal-profile.component.html',
  styleUrls: ['./personal-profile.component.scss']
})
export class PersonalProfileComponent implements OnInit {


  disabled: boolean = false;
  public users: IUserPost[] = [];
  public displayForm = false;
  lastName!: string;

  user?: UserModel;

  imageUrl: string = '';

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) { }


  fetchPageData(){
    console.log('fetch page data')
    this.authService.getUser().subscribe(
      (res) => {
        console.log('got the user -> ', res);
        const imageUrl = res.imageUrl || 'https://via.placeholder.com/300';
        this.imageUrl = imageUrl;
        this.user = res._doc;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  ngOnInit(): void {
    this.fetchPageData();
  }


  goToModifyProfile() {
    this.router.navigate(["/account/profile"]);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModifyPersonalProfileComponent, {
      //  width: '450px',
      data: 'right click',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        // this.updateSpaces();
      }

      // window.location.reload();

      this.fetchPageData(); // on refetch les données de l'utilisateur;

      // console.log('The dialog was closed');
    });

  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeletePersonalProfileComponent, {
      //  width: '450px',
      data: 'right click',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        // this.updateSpaces();
      }

      // window.location.reload();

      this.fetchPageData(); // on refetch les données de l'utilisateur;

      // console.log('The dialog was closed');
    });

  }

}
