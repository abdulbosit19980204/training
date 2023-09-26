import { Router } from "express";
import UserLessons from "../models/UserLessons.js";
import Lesson from "../models/Lesson.js";
import Parts from "../models/Part.js";
const router = Router()
router.get('/review', async(req, res) => {
    const userId = req.userId
    const reviewLessons = await UserLessons.find({ userId: userId }).populate('lessonId').lean()
    const lessons = await (await Lesson.find()).length
    const Part = await Parts.find().lean()

    res.render('review', {
        title: "Review",
        isReview: true,
        reviewLessons: reviewLessons,
        lessonsComplated: reviewLessons.length,
        lessons: lessons,
        Part: Part,
    })
})


export default router