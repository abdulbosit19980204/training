import { Router } from "express";
import User from "../models/User.js";

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

router.post('/apply', async(req, res) => {
    console.log(req.body);
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        superAdmin: req.body.superAdmin ? 'on' : 'off',
        admin: req.body.admin ? 'on' : 'off',

    }
    const user = await User.create(userData)
    res.redirect('/login')
})
export default router