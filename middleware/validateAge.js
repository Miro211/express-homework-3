function validateAge(req,res,next) {
    const {age} = req.body
    if (!age) {
        return res.status(400).json({message : "Age is required"})
    }
    if (typeof age !== 'number') {
        return res.status(400).json({message : "Age must be number"})
    }
    if (age <= 18 || age >= 65) {
        return res.status(400).json({message : "Age must be bigger than 18 and lower than 65"})
    }
    next()
}
module.exports = {validateAge}