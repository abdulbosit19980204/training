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


const PORT = process.env.PROT || 1998
app.listen(PORT, () => {
    console.log("Server is running on the PORT =>", PORT);
})