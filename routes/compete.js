import { Router } from "express";
import User from "../models/User.js";


const router = Router()

router.get('/compete/:id', async(req, res) => {
    const userData = req.userData
    const userId = req.userId
    const competerId = req.params.id
    console.log("userID = ", userId, "competerId", competerId);
    const competerData = await User.findById(competerId).lean()
    res.render('compete', {
        title: "Compete",
        userData: userData,
        competerData: competerData,
    })
})
export default router