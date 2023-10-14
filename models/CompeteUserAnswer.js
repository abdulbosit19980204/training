import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const CompeteUserAnswerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // competerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    // lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
    answer: { type: String, required: true },
}, { timestamps: true })

const UserAnswer = model("UserAnswer", CompeteUserAnswerSchema)
export default UserAnswer