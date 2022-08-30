import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import SpaceService from '../../services/space.service';
import SpaceModel from '../../models/space.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})

// PARENT
export class MainPageComponent implements OnInit {
  spaces: SpaceModel[] = [];
  isClient?: Boolean;

  constructor(
    private route: ActivatedRoute,
    private spaceService: SpaceService,
    private authService: AuthService
  ) {}


  async clientDataLoad() {
    try {
      const isClient = await this.authService.isClient();

      this.isClient = isClient;
    } catch (err) {
      this.isClient = false;
    }
  }
  ngOnInit(): void {
    this.spaceService.getAllSpaces().subscribe((spaces) => {
      // console.log(spaces);
      // https://angular.io/guide/inputs-outputs
      this.spaces = spaces;
      this.clientDataLoad();
    });
  }

  redirectToAnotherPage(){
    // console.log('redirecting...');
  }








}
