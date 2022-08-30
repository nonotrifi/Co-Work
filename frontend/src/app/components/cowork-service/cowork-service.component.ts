import { Component, Input, OnInit } from '@angular/core';
import ProposalModel from 'src/app/models/proposal.model';
import {Router} from "@angular/router";
import { ProposalService } from 'src/app/services/proposal.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cowork-service',
  templateUrl: './cowork-service.component.html',
  styleUrls: ['./cowork-service.component.scss']
})
export class CoworkServiceComponent implements OnInit {

  isAdmin?: boolean; // sans !   ->    soit boolean soit undefined

  isAuth?: boolean;
  isClient?: boolean;
  @Input() proposalModel!: ProposalModel;

  proposal!: ProposalModel;

  constructor(
    private proposalService: ProposalService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.proposal = this.proposalModel
    this.authService.isAuth$.subscribe(async (bool: boolean) => {
      this.isAuth = bool;
    });

    this.clientDataLoad();
  }

  goToLogin(): void{
    this.router.navigateByUrl('/login')
}
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
goToReservations(): void{
  this.router.navigateByUrl('/reservations')
}
}
