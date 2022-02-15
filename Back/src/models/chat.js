import { Schema, model } from "mongoose";
import User from "./user"
// import Message from "./message"

const chatSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

export default model('Chat', chatSchema);