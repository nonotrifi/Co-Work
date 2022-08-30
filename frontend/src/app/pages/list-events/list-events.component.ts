import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import eventModel from 'src/app/models/event.model';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.scss']
})
export class ListEventsComponent implements OnInit {

  eventTab: eventModel[] =  [];
  isClient?: boolean;


  constructor(
    private eventService: EventService,
    private authService: AuthService
  ) { }


  async clientDataLoad() {
    try {
      const isClient = await this.authService.isClient();

      this.isClient = isClient;
    } catch (err) {
      this.isClient = false;
    }
  }

  ngOnInit(): void {
    this.eventService
    .getAllEvents()
    .subscribe((events) => (this.eventTab = events));

    this.clientDataLoad();
  }

}
