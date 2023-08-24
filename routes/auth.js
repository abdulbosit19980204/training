import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt"
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
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        superAdmin: req.body.superAdmin ? 'on' : 'off',
        admin: req.body.admin ? 'on' : 'off',

    }
    const user = await User.create(userData)
    res.redirect('/login')
})
export default router