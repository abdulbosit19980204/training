import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt"
import { genrateJWTToken } from "../services/token.js";
const router = Router()

router.get('/login', (req, res) => {
    if (req.cookies.token) {
        res.redirect('/learn')
    }
    res.render('login', {
        title: "Login",
        isLogin: true,
        logErr: req.flash('logErr'),
    })
})
router.get('/apply', (req, res) => {
    if (req.cookies.token) {
        res.redirect('/learn')
    }
    res.render('apply', {
        title: "Apply",
        isApply: true,
        regErr: req.flash('regErr')
    })

})

router.get('/logout', (req, res) => {
        res.clearCookie('token')
        res.redirect('/learn')
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
        req.flash('logErr', "User not found")
        res.redirect('/login')
        return
    }
    const isPassEqual = await bcrypt.compare(req.body.password, existUser.password)
    if (!isPassEqual) {
        req.flash('logErr', "Password is wr")
        res.redirect('/login')
    }

    const token = genrateJWTToken(existUser._id)
    res.cookie('token', token, { httpOnly: true, secure: true })

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
    const token = genrateJWTToken(user._id)
    res.cookie('token', token, { httpOnly: true, secure: true })
    res.redirect('/login')
})
export default router