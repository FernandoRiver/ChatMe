import { Schema, model } from "mongoose";
import user from "./user";

const messageSchema = new Schema({
    data: {
        type: String,
        required: true
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

export default model('Message', messageSchema);