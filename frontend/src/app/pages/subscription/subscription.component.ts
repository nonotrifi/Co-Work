import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignupPaymentComponent } from 'src/app/components/signup-payment/signup-payment.component';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openPaymentDialog(subscriptionId: string, title: string) {
    const dialogRef = this.dialog.open(SignupPaymentComponent, {
      // width: '250px',
      data: {
        subscriptionId: subscriptionId.trim(),
        title,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      console.log('The dialog was closed');
    });
  }
}
