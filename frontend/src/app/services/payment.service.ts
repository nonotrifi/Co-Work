import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import SubscriptionEnum from '../enums/subscription.enum';
import SubscriptionModel from '../models/subscription.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private api = environment.api;
  headers = {
    'Content-Type': 'application/json',
  };
  constructor(private http: HttpClient) {}

  payment(token: string, amount: number) {
    return this.http.post(
      this.api + '/subscriptions/payment',
      {
        token,
        amount,
      },
      {
        headers: this.headers,
      }
    );
  }

  getMySubscription() {
    const token = localStorage.getItem('token');
    return this.http.get<SubscriptionModel>(this.api + '/subscriptions/me', {
      headers: {
        Authorization: 'Bearer ' + token,
        ...this.headers,
      },
    });
  }

  subscription(
    payment_method: string,
    lookup_key: string,
    subscription: SubscriptionEnum
  ) {
    const token = localStorage.getItem('token');
    return this.http.post(
      this.api + '/subscriptions/',
      {
        payment_method,
        lookup_key,
        subscription,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
          ...this.headers,
        },
      }
    );
  }
}
