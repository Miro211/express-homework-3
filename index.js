const express = require('express')
const session = require('express-session')
require('dotenv').config()
const authRouter = require("./routes/auth.js")
const app = express()
// const { validateAge, validateEmail, validateName, validatePassword } = require('./middleware/index.js')
app.use(express.json())
app.use(session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))

app.use('/' , authRouter)
app.listen(3000)

