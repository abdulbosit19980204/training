import { Router } from "express";
import Lesson from "../models/Lesson.js";
import Restaurant from "../models/Restaurants.js"

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
    const RestaurantData = await Restaurant.find().lean()
    const lessons = await Lesson.find().lean()
    res.render('learn', {
        title: "Lessons",
        isLearn: true,
        isComplatedModule: true,
        isCurrentModule: false,
        RestaurantData: RestaurantData,
        lessons: lessons,
    })
})
router.get('/review', (req, res) => {
    res.render('review', {
        title: "Review",
        isReview: true,

    })
})

router.get('/courses', (req, res) => {
    res.render('courses', {
        title: "Courses",
        isCourses: true,

    })
})

export default router