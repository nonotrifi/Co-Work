import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { TeardownLogic } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import SpaceModel from '../../models/space.model';
import SpaceService from '../../services/space.service';

@Component({
  selector: 'app-info-space',
  templateUrl: './info-space.component.html',
  styleUrls: ['./info-space.component.scss'],
})
export class InfoSpaceComponent implements OnInit {


  isAdmin?: boolean; // sans !   ->    soit boolean soit undefined
  isClient?: boolean;
  isAuth?: boolean;
  space?: SpaceModel;

  constructor(
    private spaceService: SpaceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params) => {

      const id = params['id'];

      if (!id) {
        this.router.navigate(['/']);
      }

      this.spaceService.getSpaceById(id).subscribe({
        next: (space: SpaceModel) => {
          // console.log(space);
          this.space = space;
        },

        error: (e) => {
          // console.log('error');
          console.log(e);
          this.router.navigate(['404']);
        },
      });

    });

    this.authService.isAuth$.subscribe(async (bool: boolean) => {
      this.isAuth = bool;
    });

    this.clientDataLoad();
  }

  goToLogin(): void{
    this.router.navigateByUrl('/login')
}

async clientDataLoad() {
  try {
    const isClient = await this.authService.isClient();
    this.isClient = isClient;
  } catch (err) {
    this.isClient = false;
  }
}

goToReservation(): void{
  this.router.navigateByUrl('/reservations')
}
}
