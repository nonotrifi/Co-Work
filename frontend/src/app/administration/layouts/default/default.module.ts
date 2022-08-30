import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashComponent } from '../../modules/dash/dash.component';
import { RouterModule } from '@angular/router';
import { PostsComponent } from '../../modules/posts/posts.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from '../../shared/components/header/header.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { AreaComponent } from '../../shared/widgets/area/area.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from '../../shared/widgets/card/card.component';
import { PieComponent } from '../../shared/widgets/pie/pie.component';
import { DashboardService } from '../../modules/dashboard.service';
import { MatTabsModule } from '@angular/material/tabs';
import { UserPostsComponent } from '../../modules/user-posts/user-posts.component';
import { SpacePostsComponent } from '../../modules/posts/space-posts/space-posts.component';
import { ServicePostsComponent } from '../../modules/posts/service-posts/service-posts.component';
import { EventPostsComponent } from '../../modules/posts/event-posts/event-posts.component';
import { ReservationPostsComponent } from '../../modules/reservation-posts/reservation-posts.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule }   from '@angular/forms';
import { SpacePostsDialogComponent } from '../../modules/posts/space-posts/space-posts-dialog/space-posts-dialog.component';
import { ServicePostsDialogComponent } from '../../modules/posts/service-posts/service-posts-dialog/service-posts-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservationSpacesAdminComponent } from '../../modules/reservation-posts/reservation-spaces-admin/reservation-spaces-admin.component';
import { EventPostsDialogComponent } from '../../modules/posts/event-posts/event-posts-dialog/event-posts-dialog.component';

import {MatSortModule} from '@angular/material/sort';
import { MaterialModule } from 'src/app/material/material.module';
import { ReservationMaterialsAdminComponent } from '../../modules/reservation-posts/reservation-materials-admin/reservation-materials-admin.component';
import { ReservationEventsAdminComponent } from '../../modules/reservation-posts/reservation-events-admin/reservation-events-admin.component';
import { MaterialPostsComponent } from '../../modules/posts/material-posts/material-posts.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashComponent,
    PostsComponent,
    HeaderComponent,
    SidebarComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    UserPostsComponent,
    SpacePostsComponent,
    ServicePostsComponent,
    EventPostsComponent,
    ReservationPostsComponent,
    SpacePostsDialogComponent,
    ServicePostsDialogComponent,
    EventPostsDialogComponent,
    ReservationSpacesAdminComponent,
    ReservationMaterialsAdminComponent,
    MaterialPostsComponent,
    ReservationEventsAdminComponent,

  ],
  imports: [
    MaterialModule,
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatDividerModule,
    MatNativeDateModule,
    MatListModule,
    RouterModule,
    HighchartsChartModule,
    FlexLayoutModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  providers: [DashboardService],
})
export class DefaultModule {}
