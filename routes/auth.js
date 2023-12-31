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
    const { phoneNumber, password } = req.body
    if (!phoneNumber || !password) {
        req.flash('logErr', "All fileds are required")
        res.redirect('/login')
        return
    }

    const existUser = await User.findOne({ phoneNumber }).lean()
    if (!existUser) {
        req.flash('logErr', "User not found")
        res.redirect('/login')
        return
    }
    if (existUser.status != 'on') {
        req.flash('logErr', "User is suspended")
        res.redirect('/login')
        return
    }
    const isPassEqual = await bcrypt.compare(req.body.password, existUser.password)
    if (!isPassEqual) {
        req.flash('logErr', "Password is wrong")
        res.redirect('/login')
        return
    }

    const token = genrateJWTToken(existUser._id)
    res.cookie('token', token, { httpOnly: true, secure: true })

    res.redirect('/learn')
})

router.post('/apply', async(req, res) => {
    const { firstName, lastName, phoneNumber, password, superAdmin, admin } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    if (!firstName || !lastName || !phoneNumber || !password) {
        req.flash('regErr', "Registration error")
        res.redirect('/apply')
        return
    }
    const userData = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        password: hashedPassword,
        superAdmin: superAdmin ? 'on' : 'off',
        admin: admin ? 'on' : 'off',

    }
    const candidate = await User.findOne({ phoneNumber })
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