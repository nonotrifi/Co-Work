import { Injectable, OnInit } from '@angular/core';
import EventModel from '../models/event.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { IEvent } from '../interfaces/event.interface';
import { IEventReservationInput } from '../interfaces/eventReservation.interface';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  urlSpaceAPI: string = 'http://localhost:3000';
  eventModel!: EventModel[];

  headers: any = {
    'Content-Type': 'application/json',
  };

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getAllEvents(withoutImages: boolean = false) {
    return this.httpClient.get<EventModel[]>(
      this.urlSpaceAPI + `/events${withoutImages ? '?wihtoutImages=true' : ''}`,
      {
        headers: this.headers,
      }
    );
  }

  getEventById(id: string) {
    return this.httpClient.get<EventModel>(`${this.urlSpaceAPI}/events/${id}`, {
      headers: this.headers,
    });
  }

  // spacesById(spacesId: number): void{
  //   const space = this.spaceTab.find(space => space.id === spacesId);
  //   if(space){
  //   }
  // }

  deleteEventById(id: string) {
    console.log('in delete headers => ', this.headers);

    console.log('deleteSpacerById', this.urlSpaceAPI, id);
    const token = this.authService.getToken();
    console.log('token getToekn function => ', token);

    this.headers.authorization = `Bearer ${token}`;
    return this.httpClient.delete<any>(`${this.urlSpaceAPI}/events/${id}`, {
      headers: this.headers,
    });
  }

  create(space: FormData) {
    return this.httpClient.post<IEvent>(`${this.urlSpaceAPI}/events`, space, {
      headers: {
        authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
  }

  makeEventReservation(eventReservation: IEventReservationInput) {
    return this.httpClient.post<any>(
      `${this.urlSpaceAPI}/events/makeEventReservation/`,
      eventReservation,
      {
        headers: {
          ...this.headers,
          authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }

  reserveEvent(eventId: string) {
    return this.httpClient.put<IEvent>(
      `${this.urlSpaceAPI}/events/${eventId}`,
      {},
      {
        headers: {
          authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }

  getEventReservations() {
    return this.httpClient.get<IEventReservationInput[]>(
      `${this.urlSpaceAPI}/events/reservations`,
      {
        headers: {
          authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }

  getPersonalEventReservations() {
    return this.httpClient.get<IEventReservationInput[]>(
      `${this.urlSpaceAPI}/events/reservations/me`,
      {
        headers: {
          authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }

  deletEventReservation(id: string) {
    const token = this.authService.getToken();
    console.log('token getToekn function => ', token);

    return this.httpClient.delete<any>(
      `${this.urlSpaceAPI}/events/reservations/${id}`,
      {
        headers: {
          ...this.headers,
          authorization: `Bearer ${token}`,
        },
      }
    );
  }
}

export default EventService;
