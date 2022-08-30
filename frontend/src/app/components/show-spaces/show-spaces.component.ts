import { Component, OnInit } from '@angular/core';
import SpaceService from '../../services/space.service';
import SpaceModel from '../../models/space.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-show-spaces',
  templateUrl: './show-spaces.component.html',
  styleUrls: ['./show-spaces.component.scss'],
})
export class ShowSpacesComponent implements OnInit {
  spaceTab: SpaceModel[] = [];
  isClient?: boolean;

  constructor(private spaceService: SpaceService, private authService: AuthService) {}


  async clientDataLoad() {
    try {
      const isClient = await this.authService.isClient();

      this.isClient = isClient;
    } catch (err) {
      this.isClient = false;
    }
  }

  ngOnInit(): void {
    // subscribe prends en paramétre un code a exécuter, une fois c'est résolu fonctionn comme promise et await

    // this.spaceTab = await this.spaceService.getAllSpaces();

    this.spaceService
      .getAllSpaces()
      .subscribe((spaces) => (this.spaceTab = spaces));

      this.clientDataLoad();
  }


}

