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
        // const lessons = await Lesson.find().sort({ lessonPart: 1 }).limit(10).lean()

    const page = req.query.page || 1;
    const itemsPerPage = 10; // Change this to your desired number of items per page
    const skip = (page - 1) * itemsPerPage;
    const limit = itemsPerPage;
    const lessons = await Lesson.find().sort({ lessonPart: 1 }).skip(skip).limit(limit).lean();
    const totalItems = await Lesson.countDocuments(); // Get total number of items
    const totalPages = Math.ceil(totalItems / itemsPerPage); // Calculate total pages
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1); // Generate an array of page numbers

    res.render('compete', {
        title: "Compete",
        userData: userData,
        competerData: competerData,
        lessons: lessons,
        pages: pages,
        page: page,
    });

})
export default router