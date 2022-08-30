import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SignupPaymentComponent } from 'src/app/components/signup-payment/signup-payment.component';
import { PaymentType } from 'src/app/enums/subscription.enum';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  paymentType: PaymentType | null = null;
  constructor(public dialog: MatDialog, private authService: AuthService, private router:Router) {}

  async ngOnInit(): Promise<void> {
    this.authService.getPaymentType().subscribe((data: PaymentType) => {
      this.paymentType = data;
    });
  }

  openPaymentDialog() {
    const dialogRef = this.dialog.open(SignupPaymentComponent, {
      // width: '250px',
      data: {
        subscriptionId: this.paymentType?.id,
        title: this.paymentType?.title,
        price: this.paymentType?.price,
        subscription: this.paymentType?.enum,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if(result) {
        this.router.navigate(['/account']);
      }
      console.log('The dialog was closed');
    });
  }
}
