import mongoose from 'mongoose';

const proposalSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 255
    },
    subTitle: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 255
    },
    description: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 255
    },
    image: {
        type: String,
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

})



export default mongoose.model("Proposal", proposalSchema)
