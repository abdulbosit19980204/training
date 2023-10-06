import { Router } from "express";
import User from "../models/User.js";
import Lesson from "../models/Lesson.js";


const router = Router()

router.get('/compete/:id', async(req, res) => {
    const userData = req.userData
    const userId = req.userId
    const competerId = req.params.id
        // console.log("userID = ", userId, "competerId", competerId);
    const competerData = await User.findById(competerId).lean()
    const lessons = await Lesson.find().sort({ lessonPart: 1 }).lean()
    res.render('compete', {
        title: "Compete",
        userData: userData,
        competerData: competerData,
        lessons: lessons,
    })
})
export default router