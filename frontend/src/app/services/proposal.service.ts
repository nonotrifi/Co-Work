import {Injectable, OnInit} from "@angular/core";
import ProposalModel from "../models/proposal.model";
import { Observable } from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { AuthService } from "./auth.service";


@Injectable({
  providedIn: 'root'
})

export class ProposalService {

  urlSpaceAPI:string="http://localhost:3000";
  proposalTab!: ProposalModel[] ;
  headers: any = {
    'Content-Type': 'application/json',
  };

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService){}


  // observable ca retourne un objet d'attente

  createProposal(proposal: FormData) {
    return this.httpClient.post(this.urlSpaceAPI + '/proposals', proposal, {
      headers: {
        authorization: `Bearer ${this.authService.getToken()}`,
      } });
  }

  getAllProposals() {
    return this.httpClient.get<ProposalModel[]>(this.urlSpaceAPI+"/proposals", {
      headers: this.headers,
    });
  }

  getProposalById(id: string) {
    return this.httpClient.get<ProposalModel>(`${this.urlSpaceAPI}/proposals/${id}`, {
      headers: this.headers,
    });
  }

  // spacesById(spacesId: number): void{
  //   const space = this.spaceTab.find(space => space.id === spacesId);
  //   if(space){
  //   }
  // }

  deleteServiceById(id: string) {
    console.log('in delete headers => ', this.headers);

    console.log('deleteSpacerById', this.urlSpaceAPI, id);
    const token = this.authService.getToken();
    console.log('token getToekn function => ', token);

    this.headers.authorization = `Bearer ${token}`;
    return this.httpClient.delete<any>(`${this.urlSpaceAPI}/proposals/${id}`, {
      headers: this.headers,
    });
  }
}
