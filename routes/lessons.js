import { Router } from "express";
import Lesson from "../models/Lesson.js";
import Restaurant from "../models/Restaurants.js"
import Parts from "../models/Part.js"
import UserLesson from '../models/UserLessons.js';
import user from "../middleware/user.js";


const router = Router()


router.get('/', (req, res) => {

    res.render('index', {
        title: "Home",
        isHome: true,
    })

})

router.get('/community', (req, res) => {
    res.render('community', {
        title: "Community",
        isCommunity: true,

    })

})

router.get('/learn', async(req, res) => {
    const userId = req.userId
    const RestaurantData = await Restaurant.find().lean()
    const uniqueLessonIds = await UserLesson.distinct('lessonId', { userId: userId });
    const uniqueLessons = await Lesson.find({ _id: { $in: uniqueLessonIds } }).lean();
    const Part = await Parts.find().lean()
    const lessons = await Lesson.find().lean()
    const progress = ((uniqueLessons.length * 100) / lessons.length).toFixed(2);
    res.render('learn', {
        title: "All Lessons",
        isLearn: true,
        isComplatedModule: true,
        isCurrentModule: false,
        RestaurantData: RestaurantData,
        lessons: lessons,
        Part: Part,
        userId: req.userId ? req.userId.toString() : null,
        UserDoneLesson: uniqueLessons,
        UserDoneLessonLen: uniqueLessons.length,
        lessonsLen: lessons.length,
        progress: progress,
    })
})

router.get('/learn/:title', async(req, res) => {
    const title = req.params.title
    const userId = req.userId
    const RestaurantData = await Restaurant.find().lean()
    const uniqueLessonIds = await UserLesson.distinct('lessonId', { userId: userId });
    const uniqueLessons = await Lesson.find({ _id: { $in: uniqueLessonIds } }).lean();
    // const UserDoneLesson = await UserLesson.find({ userId: userId }).populate('lessonId').lean()
    const Part = await Parts.find().lean()
    const lessons = await Lesson.find({ lessonPart: title }).lean()
    const progress = ((uniqueLessons.length * 100) / lessons.length).toFixed(2);
    res.render('learn', {
        title: "Lessons",
        isLearn: true,
        isComplatedModule: true,
        isCurrentModule: false,
        RestaurantData: RestaurantData,
        lessons: lessons,
        Part: Part,
        userId: req.userId ? req.userId.toString() : null,
        UserDoneLesson: uniqueLessons,
        UserDoneLessonLen: uniqueLessons.length,
        lessonsLen: lessons.length,
        title: title,
        progress: progress,
    })
})

router.get('/courses', (req, res) => {
    res.render('courses', {
        title: "Courses",
        isCourses: true,

    })
})

router.get('/lesson/:id', async(req, res) => {
    const id = req.params.id
    const lessonDetail = await Lesson.findById(id).populate('user').lean()
    res.render('lessonDetail', {
        title: "Lesson details",
        lessonDetail: lessonDetail,
    })
})

router.get('/lesson-done/:id', async(req, res) => {

    const userId = req.userId
    const lessonId = req.params.id
    const userLesson = await UserLesson.create({ userId, lessonId })
    res.redirect('/learn')
    return
})
export default router