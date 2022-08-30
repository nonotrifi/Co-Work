import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import SpaceModel from '../../models/space.model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  // https://angular.io/guide/inputs-outputs#configuring-the-child-component
  @Input() spaceList: SpaceModel[] = [];

  myControl = new FormControl('');

  filteredOptions: Observable<SpaceModel[]> | undefined;

  image!: string;

  constructor(private router: Router) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );



    this.image = 'assets/w2.jpg';
  }

  ngOnChanges(changes: SimpleChanges) {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

  }


  details(id: string) {
    this.router.navigate(['/spaces', id]);
  }

  // https://angular.io/guide/inputs-outputs#watching-for-input-changes

  private _filter(value: string): SpaceModel[] {
    const filterValue = value.toLowerCase();

    return this.spaceList.filter((spaceListItem) => {
      return spaceListItem.title.toLowerCase().includes(filterValue);
    });
  }
}
