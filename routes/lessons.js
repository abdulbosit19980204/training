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

router.get('/community', async(req, res) => {
    const myUserId = req.userId
    const userData = req.userData
    const distinctUsers = await UserLesson.distinct('userId');
    // const userLastDoneLesson = await UserLesson.findOne().populate('userId').populate('lessonId').lean()
    const distinctUsersWithData = await Promise.all(
        distinctUsers.map(async(userId) => {
            // const userLesson = await UserLesson.findOne({ userId }).populate('userId').populate('lessonId').lean();
            const userLesson = await UserLesson.findOne({ userId })
                .populate('userId')
                .populate('lessonId')
                .sort({ completedAt: -1 }) // Sort by completedAt in descending order
                .limit(1) // Get only the latest record
                .lean();
            return userLesson;
        })
    );
    res.render('community', {
        title: "Community",
        isCommunity: true,
        userData: userData,
        usersDoneLesson: distinctUsersWithData,
        myUserId: myUserId,
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

router.get('/courses', async(req, res) => {
    const userData = req.userData
    const courses = await Parts.find().lean();
    const lessons = await Lesson.find().lean();
    const lessonCounts = {};

    lessons.forEach(lesson => {
        const lessonPart = lesson.lessonPart;
        if (lessonCounts[lessonPart]) {
            lessonCounts[lessonPart]++;
        } else {
            lessonCounts[lessonPart] = 1;
        }
    });

    const lessonCountsArray = [];

    for (const lessonPart in lessonCounts) {
        const course = courses.find(course => course.lessonsTypeName === lessonPart);
        if (course) {
            lessonCountsArray.push({ lessonPart, count: lessonCounts[lessonPart], lessonTypeImg: course.lessonsTypeImg });
        } else {
            lessonCountsArray.push({ lessonPart, count: lessonCounts[lessonPart], lessonTypeImg: 'default-image-url' }); // Provide a default image URL if necessary
        }
    }
    res.render('courses', {
        title: "Courses",
        isCourses: true,
        userData: userData,
        courses: courses,
        lessonCounts: lessonCountsArray,
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
    res.redirect('/lesson-done')
    return
})

router.get('/lesson-done', (req, res) => {
    const userId = req.userId
    const userData = req.userData
    res.render('lessonDone', {
        title: "Lesson Done",
        userData: userData,

    })
})
export default router