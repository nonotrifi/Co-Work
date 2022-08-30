import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router'


@Component({
  selector: 'app-contact-bar',
  templateUrl: './contact-bar.component.html',
  styleUrls: ['./contact-bar.component.scss']
})
export class ContactBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToContactShow(): void {
    this.router.navigateByUrl('/contact')
  }

}
