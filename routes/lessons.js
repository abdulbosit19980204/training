import { Router } from "express";
import Lesson from "../models/Lesson.js";
import Restaurant from "../models/Restaurants.js"
import Parts from "../models/Part.js"
import UserLesson from '../models/UserLessons.js';
import user from "../middleware/user.js";
import User from "../models/User.js";


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
    const lessons = await Lesson.find().sort({ lessonPart: 1 }).lean()
    const progress = ((uniqueLessons.length * 100) / lessons.length).toFixed(2);
    const userData = req.userData
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
        userData: userData,
    })
})




router.get('/learn/:title', async(req, res) => {
    const userData = req.userData
    console.log(userData);
    const title = req.params.title
    const userId = req.userId
    const RestaurantData = await Restaurant.find().lean()
    const uniqueLessonIds = await UserLesson.distinct('lessonId', { userId: userId });
    const uniqueLessons = await Lesson.find({ _id: { $in: uniqueLessonIds }, lessonPart: title }).lean();
    const Part = await Parts.find().lean()
    const lessons = await Lesson.find({ lessonPart: title }).lean()
    let progress = ((uniqueLessons.length * 100) / lessons.length).toFixed(2);
    if (uniqueLessons.length == 0) {
        progress = 0

    }
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
        userData: userData,
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
    const userData = req.userData
    const lessonDetail = await Lesson.findById(id).populate('user').lean()
    res.render('lessonDetail', {
        title: "Lesson details",
        lessonDetail: lessonDetail,
        userData: userData,
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