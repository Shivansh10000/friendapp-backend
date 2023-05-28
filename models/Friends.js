import mongoose, { mongo } from "mongoose";

const friendSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    } 
})

const FriendModel = mongoose.model('friends', friendSchema)

export default FriendModel