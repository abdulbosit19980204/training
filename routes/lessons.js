import { Router } from "express";

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

router.get('/learn', (req, res) => {
    res.render('learn', {
        title: "Lessons",
        isLearn: true,
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