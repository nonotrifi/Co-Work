import { Request, Response } from "express";
import EmailUtil from "../utils/email";

let emailUtil = new EmailUtil();

const emailService = {
  receiveEmail: (req: Request, res: Response) => {
    console.log("receiveEmail");

    const emailParams = req.body;
    // TODO ; refacto into controller
    emailUtil.receiveEmailContact(
      emailParams,
      (err: any, info: { messageId: any }) => {
        if (err) {
          console.error("error on send mail:", err);
          res.status(500).json({ issue: err });
          return;
        }
        console.log(`The mail has beed send 😃 and the info is`, info);

        res.send(emailParams);
        return;
      }
    );
  },
};

export default { emailService };
