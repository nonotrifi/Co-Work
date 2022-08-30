import mongoose from "mongoose";

const ReservationEventSchema = new mongoose.Schema({
eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: false,
},
userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
},
spaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Space",
    required: false,
},

});

export default mongoose.model("ReservationEvent", ReservationEventSchema);
