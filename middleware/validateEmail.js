const fs = require('fs');
const path = require('path');

function validateEmail(req, res, next) {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({message : "Email is required"})
    }
    if (typeof email !== 'string') {
        return res.status(400).json({ message: "Email must be string" });
    }

    if (!email.includes('@') || !email.includes('.')) {
        return res.status(400).json({ message: "Incorrect Email" });
    }

    const filePath = path.join(__dirname, '..', 'db', 'users.json');
    fs.readFile(filePath, 'utf-8', (err, fileData) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Server error while reading users database" });
        }

        let users = [];
        try {
            users = JSON.parse(fileData);
        } catch (e) {
            console.error("Error parsing users.json:", e);
            return res.status(500).json({ message: "Corrupted users database" });
        }

        const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
        if (exists) {
            return res.status(400).json({ message: "Email is already taken" });
        }

        next();
    });
}

module.exports = {validateEmail};
