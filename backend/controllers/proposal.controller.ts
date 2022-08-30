import {Request, Response} from "express";
import proposalService from "../services/proposal.service";


const proposalController = {
    getAll: (req: Request, res: Response) => {return proposalService.getProposals(res)},
    create: (req: Request, res: Response) => { return proposalService.createProposal(req, res)},
    delete: (req: Request, res: Response) => { return proposalService.deleteProposal(req, res)},
}


export default proposalController;
