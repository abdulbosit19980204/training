import express from "express"
import { engine, create } from "express-handlebars"
import mongoose from "mongoose"
import LessonsRoutes from "./routes/lessons.js"
import AuthRoutes from "./routes/auth.js"
import ReviewRoutes from "./routes/review.js"
import CompeteRoutes from "./routes/compete.js"
import * as dotenv from 'dotenv'
import session from "express-session"
import flash from "connect-flash"
import cookieParser from "cookie-parser"
import varMiddleware from "./middleware/var.js"
import user from "./middleware/user.js"
import helpers from "./utils/index.js"
dotenv.config()
const app = express()
const hbs = create({ defaultLayout: 'main', extname: 'hbs', helpers: helpers })
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs')
app.set('views', './views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(express.json())
app.use(cookieParser())

app.use(session({ secret: "T@tu", resave: false, saveUninitialized: false }))
app.use(flash())

app.use(varMiddleware)
app.use(user)
app.use(LessonsRoutes)
app.use(ReviewRoutes)
app.use(AuthRoutes)
app.use(CompeteRoutes)
const startApp = () => {
    try {
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        const PORT = process.env.PROT || 1998
        app.listen(PORT, () => {
            console.log("Server is running on the PORT =>", PORT);
        })
    } catch (error) {
        console.log(error);
    }
}
startApp()