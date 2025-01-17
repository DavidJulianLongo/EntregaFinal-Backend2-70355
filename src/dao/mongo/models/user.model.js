import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'the field is required']
    },
    last_name: {
        type: String,
        required: [true, 'The field is required']
    },
    email: {
        type: String,
        required: [true, 'The field is required'],
        unique: true,
    },
    age: Number,
    password: String,
    role: {
        type: String,
        default: "user"
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    }
});

export const userModel = mongoose.model(userCollection, userSchema);