import {Request, Response} from "express";
import emailService from "../services/email.service";
import EmailUtil from "../utils/email";


const emailController = {

    receiveEmail: (req: Request, res: Response) => { return emailService.emailService.receiveEmail(req, res)},

}


export default emailController;
