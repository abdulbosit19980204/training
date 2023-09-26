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
    const UserDoneLesson = await UserLesson.find({ userId: userId }).lean()
    const Part = await Parts.find().lean()
    const lessons = await Lesson.find().lean()
    res.render('learn', {
        title: "Lessons",
        isLearn: true,
        isComplatedModule: true,
        isCurrentModule: false,
        RestaurantData: RestaurantData,
        lessons: lessons,
        Part: Part,
        userId: req.userId ? req.userId.toString() : null,
        UserDoneLesson: UserDoneLesson,
        UserDoneLessonLen: UserDoneLesson.length,
        lessonsLen: lessons.length,
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
    console.log(userLesson);
    res.redirect('/learn')
    return
})
export default router