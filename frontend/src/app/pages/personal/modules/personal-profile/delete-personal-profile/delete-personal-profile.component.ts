import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import UserModel from 'src/app/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { AuthService } from 'src/app/services/auth.service';
import { ModifyPersonalProfileComponent } from '../modify-personal-profile/modify-personal-profile.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-personal-profile',
  templateUrl: './delete-personal-profile.component.html',
  styleUrls: ['./delete-personal-profile.component.scss'],
})
export class DeletePersonalProfileComponent implements OnInit {
  user?: UserModel;
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<ModifyPersonalProfileComponent>,
  ) {}

  ngOnInit(): void {}

  async onDelete(event: any) {
    console.log('event submit delete: ', event);
    this.userService.deleteUser().subscribe((res) => {
      this.snackBarService.openSnackBar('Suppression du compte terminée avec succès', 'OK');
      //
      this.router.navigate(['/']);
      this.dialogRef.close();
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}

// this.userService.deleteUser().subscribe((res) => {
//   this.snackBarService.openSnackBar('User deleted', '', {
//     console.log('WLH')
//   }))
