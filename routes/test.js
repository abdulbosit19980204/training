import { Router } from "express";

const router = Router()
router.get('/test/:id', (req, res) => {
    const userData = req.userData
    res.render('test', {
        title: "Competing",
        userData: userData,
    })
})
export default router