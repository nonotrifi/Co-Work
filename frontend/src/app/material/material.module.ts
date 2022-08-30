import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { MatInputModule } from '@angular/material/input'; // Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  imports: [CommonModule],
  exports: [
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatSliderModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDialogModule,
    MatRadioModule,
    MatTableModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MaterialFileInputModule,
    MatPaginatorModule,
  ],
  declarations: [],
})
export class MaterialModule {}
