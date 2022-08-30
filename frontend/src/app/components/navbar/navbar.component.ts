import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  imageUrl!: string; // obligé de définir la valeur ( ne peut pas être undefined )
  isAdmin?: boolean; // sans !   ->    soit boolean soit undefined

  isClient?: boolean;
  isAuth?: boolean;

  constructor(private router: Router, private authService: AuthService) {}

  async adminDataLoad() {
    try {
      const isAdmin = await this.authService.isAdmin();
      console.log('isAdmin', isAdmin);
      this.isAdmin = isAdmin;
    } catch (err) {
      console.log('err', err);
      this.isAdmin = false;
    }
  }

  async clientDataLoad() {
    try {
      const isClient = await this.authService.isClient();
      this.isClient = isClient;
    } catch (err) {
      this.isClient = false;
    }
  }

  async loadData() {
    await this.clientDataLoad();
    await this.adminDataLoad();
  }
  ngOnInit() {
    this.router.events.subscribe(async (val) => {
      if (val instanceof NavigationEnd) {
        console.log('NavigationEnd');
        await this.loadData();
      }
    });

    // Auth pour savoir si on est connecté ou pas
    this.authService.isAuth$.subscribe(async (bool: boolean) => {
      this.isAuth = bool;
    });
    this.imageUrl = 'assets/téléchargement.png';
  }

  logout() {
    this.authService.logout();
  }
}
