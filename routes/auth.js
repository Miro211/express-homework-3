const express = require('express')
const fs = require('fs')
const path = require('path')
const { registerSchema } = require('../schema/schema')
const router = express.Router()

const usersPath = path.join(__dirname, "..", "db", "users.json")

router.post('/register', (req, res) => {
    const { error, value } = registerSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })

    }
    let users = JSON.parse(fs.readFileSync(usersPath, "utf-8"))
    const exists = users.some(u => u.email.toLowerCase() === value.email.toLowerCase())
    if (exists) {
        
        return res.status(400).json({ message: "Email is already registered" })
    }
    users.push(value)
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2))
    res.json({ message: 'User is registered' })
})

router.post("/login", (req, res) => {
    const { email, password } = req.body
    const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"))
    const user = users.find(u => u.email === email && u.password === password)
    if (!user) {
        return res.status(400).json({ error: "Invalid Email or Password" })
    }
    req.session.user = user;
    res.json({ message: 'Successful login', user })
})

router.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.json({ message: "Logged out succesfully" })
    })
})

module.exports = router