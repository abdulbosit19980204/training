import express from "express"
import { engine, create } from "express-handlebars"


const app = express()
const hbs = create({ defaultLayout: 'main', extname: 'hbs' })
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs')
app.set('views', './views')

app.get('/', (req, res) => {
    res.render('index')

})

app.get('/community', (req, res) => {
    res.render('community')

})

app.get('/learn', (req, res) => {
    res.render('learn')
})
app.get('/review', (req, res) => {
    res.render('review')
})

app.get('/courses', (req, res) => {
    res.render('courses')
})
const PORT = process.env.PROT || 1998
app.listen(PORT, () => {
    console.log("Server is running on the PORT =>", PORT);
})