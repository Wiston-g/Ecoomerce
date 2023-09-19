import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    rol:[{
        ref: "Role",
        type: Schema.Types.ObjectId,
    }],
},{
    timestamps: true,
})

export default mongoose.model('User', userSchema);