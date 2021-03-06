import { Schema, model } from "mongoose";

const userSchema = new Schema({
    first: {
        type: String,
        required: true
    },
    last: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    chats:[{
        type: Schema.Types.ObjectId, 
        ref: 'Chat'
    }]
})

export default model('User', userSchema);