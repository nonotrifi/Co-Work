import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { Router } from '@angular/router';
import { index, line } from 'd3';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})

export class PostsComponent implements OnInit {


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
        label: 'Services',
        link: 'services',
        index: 2
      },
      {
        label: 'Events',
        link: 'events',
        index: 3
      },
      {
        label: 'Material',
        link: 'materials',
        index: 4
      }

    ]
  }

  ngOnInit(): void {
          this.router.events.subscribe((res) => {
            this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
        });
      }
  }



