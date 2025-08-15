const express = require('express')
const validateName = require('./middleware/validateName')
const validateAge = require('./middleware/validateAge')
const validateEmail = require('./middleware/validateEmail')
const validatePassword = require('./middleware/validatePassword')
const app = express()
const port = 3000
require('dotenv').config()
app.use(express.json())

app.post('/register' , validateName, validateAge, validateEmail, validatePassword, (req,res) => {
    res.json({message : 'User is registered'})
})
app.listen(process.env.PORT)