import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import SubscriptionEnum from 'src/app/enums/subscription.enum';
import { PaymentService } from 'src/app/services/payment.service';
import { StripeScriptTag } from 'stripe-angular';

export interface DialogData {
  subscriptionId: string;
  title: string;
  price: number;
  subscription: SubscriptionEnum;
}
@Component({
  selector: 'app-signup-payment',
  templateUrl: './signup-payment.component.html',
  styleUrls: ['./signup-payment.component.scss'],
})
export class SignupPaymentComponent {
  invalidError: stripe.Error | undefined;
  cardDetailsFilledOut: boolean = false;
  cardCaptureReady: number = 1;
  subscriptionId = 'price_1LV1snLgo658MnS5i2t2k3kz';
  stripeDisable: boolean = false;
  processing:boolean = false;
  elementStyles = {
    base: {
      iconColor: '#c4f0ff',
      color: '#000',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',

      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#87BBFD',
      },
    },
    invalid: {
      iconColor: '#FFC7EE',
      color: '#FFC7EE',
    },
  };
  elementClasses = {
    focus: 'focused',
    empty: 'empty',
    invalid: 'invalid',
  };
  extraData = {};
  constructor(
    private stripeScriptTag: StripeScriptTag,
    private paymentService: PaymentService,
    public dialogRef: MatDialogRef<SignupPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    if (!this.stripeScriptTag.StripeInstance) {
      this.stripeScriptTag.setPublishableKey(
        'pk_test_51LTqhmLgo658MnS5mlRSXJQi7zoiyqx4a3Q1j6bPuPYIyRrhgbqfB0wwDWAMggFR5jstf8lsiFYBWbfdvVBaWLpk00Vo29xIWJ'
      );
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onStripeInvalid(error: stripe.Error) {
    // console.log('Validation Error', error);
  }

  onStripeError(error: stripe.Error) {
    // console.error('Stripe error', error);
  }

  // override to be the subscription
  setPaymentMethod(token: stripe.paymentMethod.PaymentMethod) {
    this.processing = true;
    // this.stripeDisable = true;
    // return
    // console.log(this.data.subscriptionId);

    // console.log('Stripe Payment Method', token);
    this.paymentService
      .subscription(token.id, this.data.subscriptionId, this.data.subscription)
      .subscribe((data) => {
        this.dialogRef.close(true);
        this.processing = false;
        // console.log(data);
      });
  }

  async setStripeToken(token: stripe.Token) {
    this.paymentService.payment(token.id, 900).subscribe((data) => {
      // console.log(data);
    });
    // console.log('Stripe Token', token);
  }

  setStripeSource(source: stripe.Source) {
    // console.log('Stripe Source', source);
  }
}
