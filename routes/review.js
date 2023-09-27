import { Router } from "express";
import UserLessons from "../models/UserLessons.js";
import Lesson from "../models/Lesson.js";
import Parts from "../models/Part.js";
const router = Router()
router.get('/review', async(req, res) => {
    const userId = req.userId
    const UserDoneLesson = await UserLessons.find({ userId: userId }).populate('lessonId').lean()
    const lessons = await Lesson.find()
    const Part = await Parts.find().lean()
    const progress = ((UserDoneLesson.length * 100) / lessons.length).toFixed(2);
    res.render('review', {
        title: "Review",
        isReview: true,
        UserDoneLesson: UserDoneLesson,
        UserDoneLessonLen: UserDoneLesson.length,
        lessonsLen: lessons.length,
        Part: Part,
        progress: progress,
    })
})


export default router