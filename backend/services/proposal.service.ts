import Proposal from "../models/proposal.model"
import { Request, Response } from "express";
import S3Util from "../utils/s3";



const proposalService = {
    getProposals: async (res: Response) => {
        try {
            const proposals = await Proposal.find();
            const s3Util = new S3Util();
            const promises = proposals.map(async (proposal) => {
                if (proposal.image) {
                    const imageUrl = await s3Util.get(proposal.image as string);
                    proposal.image = imageUrl;
                    return proposal;
                }
                proposal.image = process.env.DEFAULT_IMAGE_URL;
                return proposal;
            });
            const proposalWithImage = await Promise.all(proposals);
            return res.json(proposalWithImage);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Server Error' });
        }
    },

    createProposal: async (req: Request, res: Response) => {
        try {
            let key: string | undefined;
            if (req.file) {
              const s3Util = new S3Util();
              const data = await s3Util.upload(req.file as Express.Multer.File);
              key = data.Key;
            }
            const proposal = await Proposal.create({
              ...req.body,
              adminId: req.user.id,
              image: key,
            });
            return res.status(201).json(proposal); // 201 CREATED
        } catch (err) {
            console.log(err);
            return res.status(400).json({ message: 'Bad Request' });
        }
    },

    deleteProposal: async (req: Request, res: Response) => {
        try {
            const proposal = await Proposal.findByIdAndDelete(req.params.id);
            const s3Util = new S3Util();
            if (proposal?.image) {
              await s3Util.delete(proposal.image as string);
            }
            return res.status(200).json({ message: "Deleted" }); // NO CONTENT
        } catch (err) {
            console.log(err);
            return res.status(400).json({ message: 'Bad Request' });
        }
    }
}
export default proposalService;
