import { Router } from "express";
import Lesson from "../models/Lesson.js";
import Quiz from "../models/Quiz.js"
import UserAnswer from "../models/CompeteUserAnswer.js";
import User from "../models/User.js";


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

router.get('/compete-done', async(req, res) => {
    const userData = req.userData
    const userId = req.userId
    const testedQuiz = await UserAnswer.find().lean()
    console.log(testedQuiz);


    res.render('competeDone', {
        title: "Compete Done",
        userData: userData,
    })
})

// Posts

// router.post('/sended-answer', async(req, res) => {
//     let points = 0
//     const userId = req.userId;
//     const quizIds = Object.keys(req.body);

//     // Iterate through the quiz IDs
//     quizIds.forEach(async(quizId) => {
//         const answer = req.body[quizId]; // Get the user's answer for this quiz
//         // console.log(answer);
//         // Now you have both the quiz ID and the user's answer, you can process them as needed.
//         const quiz = await Quiz.findById(quizId);

//         const answerData = {
//             userId: userId,
//             quizId: quizId,
//             answer: answer
//         }
//         const UserAnswerSaved = await UserAnswer.create(answerData)
//         console.log(UserAnswerSaved);

//         if (quiz.answer == answer) {
//             points = points + 1
//             console.log("user answer", answer, "and correct answer", quiz.answer, "correct", " and points => ", points * 5);
//             // Here, you can compare `answer` with `quiz.answer` to check if it's correct.
//             // Then, you can do whatever processing you need to do.
//         } else {
//             console.log("incorrect");
//         }

//     });

//     res.render('competeDone', {
//         title: "Complation",
//         points: points * 5,
//     });
// });

router.post('/sended-answer', async(req, res) => {
    let points = 0
    const userId = req.userId;
    const userData = req.userData
    const quizIds = Object.keys(req.body);

    // Create an array to store the promises
    const quizPromises = quizIds.map(async(quizId) => {
        const answer = req.body[quizId];
        const quiz = await Quiz.findById(quizId);

        const answerData = {
            userId: userId,
            quizId: quizId,
            answer: answer
        }
        const UserAnswerSaved = await UserAnswer.create(answerData);
        console.log(UserAnswerSaved);
        if (quiz.answer == answer) {
            points = points + 1;
            // console.log("user answer", answer, "and correct answer", quiz.answer, "correct", " and points => ", points * 5);
        } else {
            // console.log("incorrect");
        }
    });

    // Wait for all promises to resolve
    await Promise.all(quizPromises);

    const userSendAnswers = await UserAnswer.find({ userId }).populate('userId').populate('quizId').lean();
    console.log(userSendAnswers);

    // Render the response after all promises have resolved
    res.render('competeDone', {
        title: "Complation",
        points: points * 5,
        userData: userData,
        userSendAnswers: userSendAnswers,
    });
});

export default router