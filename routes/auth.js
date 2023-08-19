import { Router } from "express";

const router = Router()

router.get('/login', (req, res) => {
    res.render('login', {
        title: "Login"
    })
})
router.get('/apply', (req, res) => {
        res.render('apply', {
            title: "Apply",
        })

    })
    // Posts

router.post('/login', (req, res) => {
    console.log(req.body);
    res.redirect('/learn')
})

router.post('/apply', (req, res) => {
    console.log(req.body);
    res.redirect('/login')
})
export default router