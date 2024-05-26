require('dotenv').config()
const express = require('express')
const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const MONGODB_URL = process.env.MONGODB_URI

const path = require('path')
const userRouter = require('./routes/user')
const {connectDB} = require('./connection')
const debug = require('debug')('dev:server')
const cookieParser = require('cookie-parser')
const {checkForAuthenticationCookie, redirectIfAuthenticated} = require("./middlewares/authentication");
const {userLogoutHandler} = require("./controllers/user");


// connecting to the database
connectDB(MONGODB_URL)

// setup middlewares
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(checkForAuthenticationCookie('token'))

// setup view engine
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('pages/index', {user: req.user})
})

app.use('/user', redirectIfAuthenticated, userRouter)

app.get('/logout',userLogoutHandler);


app.listen(PORT, () => {
    debug(`Server: http://${HOST}:${PORT}`)
})