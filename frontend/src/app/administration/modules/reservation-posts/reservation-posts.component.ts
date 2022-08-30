import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-posts',
  templateUrl: './reservation-posts.component.html',
  styleUrls: ['./reservation-posts.component.scss'],
})
export class ReservationPostsComponent implements OnInit {
  navLinks!: any[];

  activeLinkIndex = -1;

  constructor(private router: Router) {
    this.navLinks = [
      // {
      //   label: 'Users',
      //   link: 'users',
      //   index: 0
      // },
      {
        label: 'Spaces',
        link: 'spaces',
        index: 1
      },
      {
        label: 'Events',
        link: 'events',
        index: 2
      },
      {
        label: 'Materials',
        link: 'materials',
        index: 3
      },

      // {
      //   label: 'Reservations',
      //   link: 'reservations',
      //   index: 4
      // }
    ]
  }

  ngOnInit(): void {
          this.router.events.subscribe((res) => {
            this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
        });
      }
}
