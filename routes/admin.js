import { Router } from "express";
const router = Router()

router.get('/admin', (req, res) => {
    res.render('admin', {
        title: "Admin",
        isAdmin: true,
    })
})

export default router