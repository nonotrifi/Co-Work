import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListServicesComponent } from './pages/list-services/list-services.component';
import { InfoSpaceComponent } from './pages/info-space/info-space.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ShowContactComponent } from './pages/show-contact/show-contact.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ReservationPageComponent } from './pages/reservation-page/reservation-page.component';
import { NotAuthGuard } from './guards/not-auth.guard';
import { AboutComponent } from './pages/about/about.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { HasPaymentGuard } from './guards/has-payment.guard';
import { IsAdminGuard } from './guards/is-admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { ListEventsComponent } from './pages/list-events/list-events.component';
import { HasPaidGuard } from './guards/has-paid.guard';
import { DefaultComponent } from './administration/layouts/default/default.component';
import { DashComponent } from './administration/modules/dash/dash.component';
import { PostsComponent } from './administration/modules/posts/posts.component';
import { SpacePostsComponent } from './administration/modules/posts/space-posts/space-posts.component';
import { UserPostsComponent } from './administration/modules/user-posts/user-posts.component';
import { ServicePostsComponent } from './administration/modules/posts/service-posts/service-posts.component';
import { EventPostsComponent } from './administration/modules/posts/event-posts/event-posts.component';
import { ReservationPostsComponent } from './administration/modules/reservation-posts/reservation-posts.component';
import { ConfirmationContactPageComponent } from './pages/contact/confirmation-contact-page/confirmation-contact-page.component';
import { PasswordComponent } from './pages/login/password/password.component';
import { PersonalComponent } from './pages/personal/personal.component';
import { PersonalProfileComponent } from './pages/personal/modules/personal-profile/personal-profile.component';
import { ModifyPersonalProfileComponent } from './pages/personal/modules/personal-profile/modify-personal-profile/modify-personal-profile.component';
import { PersonalEmailComponent } from './pages/personal/modules/personal-email/personal-email.component';
import { ResetPasswordComponent } from './pages/login/reset-password/reset-password.component';
import { ValidationEmailSendComponent } from './pages/login/password/validation-email-send/validation-email-send.component';
import { ReservationSpacesAdminComponent } from './administration/modules/reservation-posts/reservation-spaces-admin/reservation-spaces-admin.component';
import { ReservationMaterialsAdminComponent } from './administration/modules/reservation-posts/reservation-materials-admin/reservation-materials-admin.component';
import { ReservationEventsAdminComponent } from './administration/modules/reservation-posts/reservation-events-admin/reservation-events-admin.component';
import { PersonalReservationSpacesComponent } from './pages/personal/modules/personal-reservation-spaces/personal-reservation-spaces.component';
import { PersonalEventsSpacesComponent } from './pages/personal/modules/personal-events-spaces/personal-events-spaces.component';
import { PersonalMaterialsSpacesComponent } from './pages/personal/modules/personal-materials-spaces/personal-materials-spaces.component';
import { MaterialPostsComponent } from './administration/modules/posts/material-posts/material-posts.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // component: SpaceComponent, outlet: 'spaces' },
  { path: 'home', component: MainPageComponent },
  { path: 'services', component: ListServicesComponent },
  { path: 'spaces/:id', component: InfoSpaceComponent },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  {
    path: 'reset-password/:resetToken',
    component: ResetPasswordComponent,
    canActivate: [NotAuthGuard],
  },
  {
    path: 'forgot-password',
    component: PasswordComponent,
    canActivate: [NotAuthGuard],
  },
  { path: 'validation-contact', component: ValidationEmailSendComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '#request-form', component: ShowContactComponent },
  { path: 'sign-up', component: SignupComponent, canActivate: [NotAuthGuard] },
  {
    path: 'reservations',
    component: ReservationPageComponent,
    canActivate: [AuthGuard, HasPaymentGuard],
  },

  {
    path: 'account',
    component: PersonalComponent,
    canActivate: [AuthGuard, HasPaymentGuard],
    children: [
      { path: '', component: PersonalProfileComponent },
      { path: 'profile', component: ModifyPersonalProfileComponent },
      { path: 'email-password', component: PersonalEmailComponent },
      // { path: 'reservations', component: PersonalReservationSpacesComponent },

      {
        path: 'reservations/spaces',
        component: PersonalReservationSpacesComponent,
      },
      { path: 'reservations/events', component: PersonalEventsSpacesComponent },
      {
        path: 'reservations/materials',
        component: PersonalMaterialsSpacesComponent,
      },
    ],
  },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'contact/confirmation', component: ConfirmationContactPageComponent },
  {
    path: 'payment',
    component: PaymentComponent,
    canActivate: [AuthGuard, HasPaidGuard],
  },
  // {
  //   path: 'subscriptions',
  //   component: SubscriptionComponent,
  // },
  { path: 'events', component: ListEventsComponent },
  // {
  //   path: '**',
  //   redirectTo: '/home',
  // },

  {
    path: 'dash',
    component: DefaultComponent,
    children: [
      { path: '', component: DashComponent },
      {
        path: 'posts',
        redirectTo: 'posts/spaces',
      },
      {
        path: 'posts',
        component: PostsComponent,
        children: [
          // { path: 'users', component: UserPostsComponent },
          { path: 'spaces', component: SpacePostsComponent },
          { path: 'services', component: ServicePostsComponent },
          { path: 'events', component: EventPostsComponent },
          { path: 'materials', component: MaterialPostsComponent },
        ],
        canActivate: [AuthGuard, IsAdminGuard],
      },
      { path: 'reservations', redirectTo: 'reservations/spaces' },
      {
        path: 'reservations',
        component: ReservationPostsComponent,
        children: [
          { path: 'spaces', component: ReservationSpacesAdminComponent },
          { path: 'materials', component: ReservationMaterialsAdminComponent },
          { path: 'events', component: ReservationEventsAdminComponent },
        ],
      },
      {
        path: 'users',
        component: UserPostsComponent,
      },
      {
        path: 'reservations',
        component: ReservationPostsComponent,
      },
    ],
    canActivate: [AuthGuard, IsAdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
