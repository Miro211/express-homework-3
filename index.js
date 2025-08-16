const express = require('express')
const validateName = require('./middleware/validateName')
const validateAge = require('./middleware/validateAge')
const validateEmail = require('./middleware/validateEmail')
const validatePassword = require('./middleware/validatePassword')
// const {validateAge, validateEmail, validateName, validatePassword} = require('./middleware/index.js')
// console.log(typeof validatePassword);

const app = express() 
require('dotenv').config()
app.use(express.json())

app.post('/register' , validateName, validateAge, validateEmail, validatePassword, (req,res) => {
    res.json({message : 'User is registered'})
})
app.listen(process.env.PORT)