import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMaterial } from '../interfaces/material.interface';
import { IMaterialReservationInput } from '../interfaces/materialReservation.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  urlSpaceAPI: string = 'http://localhost:3000';
  headers = {
    'Content-Type': 'application/json',
  };
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}
  getBySpaceId(id: string) {
    return this.httpClient.get<IMaterial[]>(
      `${this.urlSpaceAPI}/materials/space/${id}`,
      {
        headers: {
          ...this.headers,
          authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }
  getAll() {
    return this.httpClient.get<any>(`${this.urlSpaceAPI}/materials/`, {
      headers: {
        ...this.headers,
        authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
  }
  delete(id: string) {
    const token = this.authService.getToken();
    return this.httpClient.delete<any>(`${this.urlSpaceAPI}/materials/${id}`, {
      headers: {
        ...this.headers,
        authorization: `Bearer ${token}`,
      },
    });
  }

  reserve(materialReservation: IMaterialReservationInput) {
    return this.httpClient.post<any>(
      `${this.urlSpaceAPI}/materials/reservation/`,
      materialReservation,
      {
        headers: {
          ...this.headers,
          authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }

  create(material: Partial<IMaterial>) {
    const token = this.authService.getToken();
    return this.httpClient.post<any>(
      `${this.urlSpaceAPI}/materials/`,
      {
        ...material,
      },
      {
        headers: {
          ...this.headers,
          authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getAllReservationsMaterial() {
    return this.httpClient.get<any>(
      `${this.urlSpaceAPI}/materials/reservations/`,
      {
        headers: {
          ...this.headers,
          authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }

  getPersonalReservationsMaterial() {
    return this.httpClient.get<any>(
      `${this.urlSpaceAPI}/materials/reservations/me`,
      {
        headers: {
          ...this.headers,
          authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }

  getResevationMaterialByUserId(id: string) {
    return this.httpClient.get<any>(
      `${this.urlSpaceAPI}/materials/reservations/${id}`,
      {
        headers: {
          ...this.headers,
          authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }

  deleteReservationMaterial(id: string) {
    const token = this.authService.getToken();
    return this.httpClient.delete<any>(
      `${this.urlSpaceAPI}/materials/reservations/${id}`,
      {
        headers: {
          ...this.headers,
          authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
