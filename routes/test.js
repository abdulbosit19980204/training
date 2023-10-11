import { Router } from "express";
import Lesson from "../models/Lesson.js";
import Quiz from "../models/Quiz.js"

const router = Router()

router.get('/test/:id', async(req, res) => {
    const userData = req.userData
    const id = req.params.id
    const competeTestId = id
    const competeData = await Lesson.findById(id).lean()
    const page = req.query.page || 1;
    const itemsPerPage = 1; // Change this to your desired number of items per page
    const skip = (page - 1) * itemsPerPage;
    const limit = itemsPerPage;
    const byLesson = competeData.lessonTitle
    const QuizData = await Quiz.find({ byLesson }).sort({ updatedAt: 1 }).skip(skip).lean();
    const QuizDataLen = (await Quiz.find({ byLesson })).length;
    const totalItems = await Quiz.countDocuments();
    const totalPages = Math.ceil(QuizDataLen / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    res.render('test', {
        title: "Competing",
        userData: userData,
        competeData: competeData,
        quizData: QuizData,
        quizDataLen: QuizDataLen,
        pages: pages,
        page: page,
        competeTestId: competeTestId,
    })
})

// Posts

router.post('/sended-answer', async(req, res) => {
    const userId = req.userId
        // const competerId =req.
    console.log(req.body);
    res.redirect('/community')
})
export default router