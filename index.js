const express = require('express')
const fs = require('fs')
const path = require('path')
require('dotenv').config()
const { validateAge, validateEmail, validateName, validatePassword } = require('./middleware/index.js')
const session = require('express-session')
const app = express()
app.use(express.json())
app.use(session({
    secret : "secret_key",
    resave : false,
    saveUninitialized : false,
    cookie : {secure : false}
}))

const usersPath = path.join(__dirname, "db", "users.json")
app.post('/register', validateName, validateAge, validateEmail, validatePassword, (req, res) => {
    const { id, name, email, password, age } = req.body
    let users = JSON.parse(fs.readFileSync(usersPath, "utf-8"))
    users.push({id,name,email,password,age})
    fs.writeFileSync(usersPath,JSON.stringify(users, null, 2))
    res.json({ message: 'User is registered' })
})

app.post("/login", (req,res) => {
    const {email,password} = req.body
    const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"))
    const user = users.find(u => u.email === email && u.password === password)
    if (!user) {
        return res.status(400).json({error : "Invalid Email or Password"})
    }
    req.session.user = user;
    res.json({ message: 'Successful login' , user })
})
app.post("/logout" , (req,res) => {
    req.session.destroy(() => {
        res.json({message : "Logged out succesfully"})
    })
})
app.listen(3000)

