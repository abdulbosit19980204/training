import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const QuizSchema = new Schema({
    quizText: { type: String, required: true, },
    optionA: { type: String, required: true, },
    optionB: { type: String, required: true, },
    optionC: { type: String, required: true, },
    optionD: { type: String, required: true, },
    answer: { type: String, required: true, },
    byLesson: { type: String, required: true, },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

}, {
    timestamps: true,
})

const Quiz = model("Quiz", QuizSchema)
export default Quiz