import { Component, OnInit, Input } from '@angular/core';
import EventModel from 'src/app/models/event.model';
import {Router} from "@angular/router";
import { EventService } from 'src/app/services/event.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  isAdmin?: boolean; // sans !   ->    soit boolean soit undefined
  isAuth?: boolean;
  isClient?: boolean;

  @Input() eventModel!: EventModel;

  event!: EventModel;

  constructor(
    private eventService: EventService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.event = this.eventModel;
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
