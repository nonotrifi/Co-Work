import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { FooterComponent } from './components/footer/footer.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SpaceComponent } from './components/space/space.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ShowSpacesComponent } from './components/show-spaces/show-spaces.component';
import { ContactBarComponent } from './components/contact-bar/contact-bar.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ShowContactComponent } from './pages/show-contact/show-contact.component';
import { SignupComponent } from './pages/signup/signup.component';
import { InfoSpaceComponent } from './pages/info-space/info-space.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { ListServicesComponent } from './pages/list-services/list-services.component';
import { CoworkServiceComponent } from './components/cowork-service/cowork-service.component';
import { ControlMessagesComponent } from './components/control-messages/control-messages.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { BookingDialogComponent } from './components/reservations/booking-dialog/booking-dialog.component';
import { ReservationPageComponent } from './pages/reservation-page/reservation-page.component';
import { StripeModule } from 'stripe-angular';
import { SignupPaymentComponent } from './components/signup-payment/signup-payment.component';
import { NgChartsModule } from 'ng2-charts';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { AboutComponent } from './pages/about/about.component';
import { ListEventsComponent } from './pages/list-events/list-events.component';
import { EventComponent } from './components/event/event.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { DefaultModule } from './administration/layouts/default/default.module';
import { ConfirmationContactPageComponent } from './pages/contact/confirmation-contact-page/confirmation-contact-page.component';
import { PasswordComponent } from './pages/login/password/password.component';
import { PersonalComponent } from './pages/personal/personal.component';
import { SidebarAccountComponent } from './pages/personal/shared/sidebar-account/sidebar-account.component';
import { PersonalProfileComponent } from './pages/personal/modules/personal-profile/personal-profile.component';

import { PersonalEmailComponent } from './pages/personal/modules/personal-email/personal-email.component';
import { ModifyPersonalProfileComponent } from './pages/personal/modules/personal-profile/modify-personal-profile/modify-personal-profile.component';
import { ResetPasswordComponent } from './pages/login/reset-password/reset-password.component';
import { ValidationEmailSendComponent } from './pages/login/password/validation-email-send/validation-email-send.component';
import { BookingEventDialogComponent } from './components/reservations/booking-event-dialog/booking-event-dialog.component';
import { BookingMaterialDialogComponent } from './components/reservations/booking-material-dialog/booking-material-dialog.component';

import { PersonalReservationSpacesComponent } from './pages/personal/modules/personal-reservation-spaces/personal-reservation-spaces.component';
import { PersonalEventsSpacesComponent } from './pages/personal/modules/personal-events-spaces/personal-events-spaces.component';
import { PersonalMaterialsSpacesComponent } from './pages/personal/modules/personal-materials-spaces/personal-materials-spaces.component';
import { MaterialPostsDialogComponent } from './administration/modules/posts/material-posts/material-posts-dialog/material-posts-dialog.component';
import { DeletePersonalProfileComponent } from './pages/personal/modules/personal-profile/delete-personal-profile/delete-personal-profile.component';

import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeFr);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ListServicesComponent,
    MainPageComponent,
    ContactComponent,
    SearchBarComponent,
    SpaceComponent,
    ShowSpacesComponent,
    InfoSpaceComponent,
    FooterComponent,
    PageNotFoundComponent,
    ContactBarComponent,
    ShowContactComponent,
    SignupComponent,
    CoworkServiceComponent,
    ControlMessagesComponent,
    ReservationsComponent,
    BookingDialogComponent,
    ReservationPageComponent,
    SignupPaymentComponent,
    SubscriptionComponent,
    AboutComponent,
    ListEventsComponent,
    EventComponent,
    PaymentComponent,
    ConfirmationContactPageComponent,
    PasswordComponent,
    PersonalComponent,
    SidebarAccountComponent,
    PersonalProfileComponent,
    PersonalEmailComponent,
    ModifyPersonalProfileComponent,
    ResetPasswordComponent,
    ValidationEmailSendComponent,
    BookingEventDialogComponent,
    BookingMaterialDialogComponent,
    PersonalReservationSpacesComponent,
    PersonalEventsSpacesComponent,
    PersonalMaterialsSpacesComponent,
    MaterialPostsDialogComponent,
    DeletePersonalProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MaterialModule,
    JwtModule,
    NgChartsModule,
    StripeModule.forRoot(''),
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    DefaultModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
