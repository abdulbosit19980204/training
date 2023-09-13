import { Schema, model } from "mongoose";

const LessonSchema = new Schema({
    lessonTitle: { type: String, required: true },
    lessonDescription: { type: String, required: true },
    lessonimgPath: { type: String, required: true },
    lessonDetails: { type: String, required: true },
    lessonPart: { type: String, required: true },
    restaurant: { type: String, required: true },
    // lessonDone: { type: Boolean, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },

}, { timestamps: true })

const Lesson = model("Lesson", LessonSchema)
export default Lesson