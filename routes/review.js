import { Router } from "express";
import UserLesson from "../models/UserLessons.js";
import Lesson from "../models/Lesson.js";
import Parts from "../models/Part.js";
const router = Router()
router.get('/review', async(req, res) => {
    const userId = req.userId
    const uniqueLessonIds = await UserLesson.distinct('lessonId', { userId: userId });
    const uniqueLessons = await Lesson.find({ _id: { $in: uniqueLessonIds } }).lean();
    const lessons = await Lesson.find()
    const Part = await Parts.find().lean()
    const progress = ((uniqueLessons.length * 100) / lessons.length).toFixed(2);
    res.render('review', {
        title: "Review",
        isReview: true,
        UserDoneLesson: uniqueLessons,
        UserDoneLessonLen: uniqueLessons.length,
        lessonsLen: lessons.length,
        Part: Part,
        progress: progress,
    })
})


export default router