import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import SpaceService from '../../services/space.service';
import SpaceModel from '../../models/space.model';
import { Observable } from 'rxjs';
import SubscriptionModel from 'src/app/models/subscription.model';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.scss'],
})
export class ReservationPageComponent implements OnInit {
  public spaceListObservable?: Observable<SpaceModel[]>;
  public subscriptionObservable?: Observable<SubscriptionModel>;

  constructor(
    private route: ActivatedRoute,
    private spaceService: SpaceService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.spaceListObservable = this.spaceService.getAllSpaces();
    this.subscriptionObservable = this.paymentService.getMySubscription();
    // .subscribe((spaces) => {
    //   console.log(spaces);
    //   // https://angular.io/guide/inputs-outputs
    //   this.spaces = spaces;
    //   console.log('ON RECUPERE LA DONNEE: ', this.spaces)
    // });
  }
}
