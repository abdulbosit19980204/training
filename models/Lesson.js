import { Schema, model } from "mongoose";

const LessonSchema = new Schema({
    lessonTitle: { type: String, required: true },
    lessonDescription: { type: String, required: true },
    lessonDetails: { type: String, required: true },
    lessonPart: { type: String, required: true },
    lessonDone: { type: Boolean, required: true },

}, { timestamps: true })

const Lesson = model("Lesson", LessonSchema)
export default Lesson