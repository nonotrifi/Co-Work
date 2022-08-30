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
import { SnackBarService } from 'src/app/services/snack-bar.service';

export interface DialogData {
  serviceList: UserModel[];
}


@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {


  dataSource!: MatTableDataSource<IUserPost>

  public users: IUserPost[] = [];
  public displayForm = false;
  columnsToDisplay = ['firstName', 'lastName', 'email', 'subscription', 'actions'];


  @Input() userList: UserModel[] | null = [];
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private snackBarService: SnackBarService
  ) {
//     this.posts = [
//       {
//         _id: 1,
//         firstName: 'John',
//         lastName: 'Doe',
//         email: 'trifi@gmail.com',
//         subscription: SubscriptionEnum.NORMALANUALLY,
//         date: '01/01/2020',
//    },
//    {
//     _id: 2,
//     firstName: 'Amine',
//     lastName: 'Laressa',
//     email: 'laressa@gmail.com',
//     subscription: SubscriptionEnum.PREMIUMMONTHLY,
//     date: '01/01/2026',
// },
//   ];


  }

  ngOnInit(): void {
    this.updateUsers();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(userId: string) {
    this.userService.deleteUserById(userId).subscribe((subscribe) => {
      this.snackBarService.openSnackBar('Suppression terminée avec succès', 'OK');
     this.updateUsers();
    })
  }

  updateUsers(){
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
      // console.log('getSpaces ', spaces)
      this.dataSource = new MatTableDataSource(this.users);

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    })
  }
}
