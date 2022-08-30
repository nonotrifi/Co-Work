
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-show-contact',
  templateUrl: './show-contact.component.html',
  styleUrls: ['./show-contact.component.scss']
})
export class ShowContactComponent implements OnInit {

  isClient?: boolean;


  constructor(private authService: AuthService) { }

  async clientDataLoad() {
    try {
      const isClient = await this.authService.isClient();

      this.isClient = isClient;
    } catch (err) {
      this.isClient = false;
    }
  }

  ngOnInit(): void {
    this.clientDataLoad();
  }



}
