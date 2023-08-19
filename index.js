import express from "express"
import { engine, create } from "express-handlebars"
import LessonsRoutes from "./routes/lessons.js"
import AuthRoutes from "./routes/auth.js"

const app = express()
const hbs = create({ defaultLayout: 'main', extname: 'hbs' })
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs')
app.set('views', './views')

app.use(express.urlencoded({ extended: true }))

app.use(LessonsRoutes)
app.use(AuthRoutes)

const PORT = process.env.PROT || 1998
app.listen(PORT, () => {
    console.log("Server is running on the PORT =>", PORT);
})