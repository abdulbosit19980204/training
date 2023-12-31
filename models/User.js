import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    firstName: { type: String, required: true, },
    lastName: { type: String, required: true, },
    phoneNumber: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    superAdmin: { type: String, required: true },
    admin: { type: String, required: true },
}, {
    timestamps: true,
})

const User = model('User', UserSchema)
export default User