import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import SpaceModel from "../../models/space.model";
import SpaceService from "../../services/space.service";
import {Router} from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss']
})
export class SpaceComponent implements OnInit {

  isAdmin?: boolean; // sans !   ->    soit boolean soit undefined

  isAuth?: boolean;
  isClient?: boolean;
  @Input() spaceModel!: SpaceModel;

  space!:SpaceModel;

  constructor(private spaceService: SpaceService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.space=this.spaceModel

    this.authService.isAuth$.subscribe(async (bool: boolean) => {
      this.isAuth = bool;
    });

    this.clientDataLoad();
  }


  goToLogin(): void{
      this.router.navigateByUrl('/login')
  }


  async adminDataLoad() {
    try {
      const isAdmin = await this.authService.isAdmin();
      console.log('isAdmin', isAdmin);
      this.isAdmin = isAdmin;
    } catch (err) {
      console.log('err', err);
      this.isAdmin = false;
    }
  }

  async clientDataLoad() {
    try {
      const isClient = await this.authService.isClient();
      this.isClient = isClient;
    } catch (err) {
      this.isClient = false;
    }
  }
  goToReservations(): void{
    this.router.navigateByUrl('/reservations')
  }
}
