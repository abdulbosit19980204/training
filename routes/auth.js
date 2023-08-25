import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt"
const router = Router()

router.get('/login', (req, res) => {
    res.render('login', {
        title: "Login",
        isLogin: true,
        logErr: req.flash('logErr'),
    })
})
router.get('/apply', (req, res) => {
        res.render('apply', {
            title: "Apply",
            isApply: true,
            regErr: req.flash('regErr')
        })

    })
    // Posts

router.post('/login', async(req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        req.flash('logErr', "All fileds are required")
        res.redirect('/login')
        return
    }

    const existUser = await User.findOne({ email })
    if (!existUser) {
        console.log('User not found')
    }
    const isPassEqual = await bcrypt.compare(req.body.password, existUser.password)
    if (!isPassEqual) { console.log("Password is wrong"); }
    res.redirect('/learn')
})

router.post('/apply', async(req, res) => {
    const { firstName, lastName, email, password, superAdmin, admin } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    if (!firstName || !lastName || !email || !password) {
        req.flash('regErr', "Registration error")
        res.redirect('/apply')
        return
    }
    const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        superAdmin: superAdmin ? 'on' : 'off',
        admin: admin ? 'on' : 'off',

    }
    const candidate = await User.findOne({ email })
    if (candidate) {
        req.flash('regErr', "User already exsist")
        res.redirect('/apply')
        return
    }
    const user = await User.create(userData)
    res.redirect('/login')
})
export default router