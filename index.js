require('dotenv').config()
const express = require('express')
const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

const path = require('path')

// setup view engine
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(PORT, () => {
    console.log(`Server: http://${HOST}:${PORT}`)
})