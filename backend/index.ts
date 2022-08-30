import express, {Response, Request, NextFunction} from 'express';
import mongoose from "mongoose";
import  dotenv from 'dotenv';
import spaceRouter from "./routes/space.route"
import userRouter from "./routes/user.route";
import proposalRouter from "./routes/proposal.route";
import subscriptionRouter from "./routes/subscription.route";
import eventRouter from "./routes/event.route";
import emailRouter from "./routes/email.route";
import ReservationRouter from "./routes/reservation.route";
import materialRouter from "./routes/material.route";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://test:testPassword@cluster0.u5ifroi.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3000;
const app = express();

const bodyParser = require("body-parser");

const cors = require("cors");


app.use(cors({ origin: "*"}))
// Allow access cors 
app.use(function(req:Request, res: Response, next: NextFunction) {
    // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    // if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,POST,PUT,DELETE');
    // }
    next();
    });

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/spaces/reservation', ReservationRouter);
app.use('/spaces', spaceRouter );
app.use('/users', userRouter);
app.use('/proposals', proposalRouter);
app.use('/subscriptions', subscriptionRouter);
app.use('/events', eventRouter);
app.use('/sendmailPost', emailRouter);
app.use('/materials', materialRouter)


app.use(bodyParser.json());

mongoose.connect(MONGO_URL,{}).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);

    });
}).catch(() => {throw new Error('Couldn\'t connect to the server')});

app.post('/upload', function(req: Request, res: Response) {
    console.log("uploading image");

    // If no image submitted, exit
    if (!req.files) return res.sendStatus(400);

    // Move the uploaded image to our upload folder
    // image.mv(__dirname + '/upload/' + image.name);

    res.sendStatus(200);
  });

app.get("/getSendmail", (req: Request, res: Response) => {
    res.send(
        "<h1>Welcome to my new channel </h1>"
    )
})


