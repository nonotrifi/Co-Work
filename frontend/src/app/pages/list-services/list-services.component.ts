import {Component, Input, OnInit} from '@angular/core';
import { ProposalService } from 'src/app/services/proposal.service';
import { AuthService } from 'src/app/services/auth.service';
import ProposalModel from 'src/app/models/proposal.model';

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.scss']
})
export class ListServicesComponent implements OnInit {



  proposalTab: ProposalModel[] = [];
  isClient?: boolean;


  constructor(private proposalService: ProposalService,
    private authService: AuthService) { }


  async clientDataLoad() {
    try {
      const isClient = await this.authService.isClient();

      this.isClient = isClient;
    } catch (err) {
      this.isClient = false;
    }
  }


  ngOnInit(): void {
    this.proposalService
      .getAllProposals()
      .subscribe((proposals) => (this.proposalTab = proposals));

      this.clientDataLoad();
  }



}
