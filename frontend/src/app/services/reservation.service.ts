import { Injectable, OnInit } from '@angular/core';
import SpaceModel from '../models/space.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

// service doit être enregistrer à la racine de l'application
@Injectable({
  providedIn: 'root',
})
export default class ReservationService {
  urlSpaceAPI: string = 'http://localhost:3000';
  spaceTab!: SpaceModel[];
  headers = {
    'Content-Type': 'application/json',
  };

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  // observable ca retourne un objet d'attente

  sendReservation(id: string, reservation: any) {
    return this.httpClient.post<any>(
      `${this.urlSpaceAPI}/spaces/reservation/${id}`,
      reservation,
      {
        headers: {
          ...this.headers,
          authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }

  getAllReservations() {
    return this.httpClient.get<any>(`${this.urlSpaceAPI}/spaces/reservation/`, {
      headers: {
        ...this.headers,
        authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
  }

  getPersonalReservations() {
    return this.httpClient.get<any>(`${this.urlSpaceAPI}/spaces/reservation/me`, {
      headers: {
        ...this.headers,
        authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
  }

  deleteReservation(id: string) {
    const token = this.authService.getToken();
    return this.httpClient.delete<any>(
      `${this.urlSpaceAPI}/spaces/reservation/${id}`,
      {
        headers: {
          ...this.headers,
          authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getReservationById(id: string) {
    return this.httpClient.get<any>(`${this.urlSpaceAPI}/spaces/reservation/${id}`, {
      headers: {
        ...this.headers,
        authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
  }
}
