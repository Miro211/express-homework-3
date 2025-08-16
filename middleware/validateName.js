function validateName(req,res,next) {
    const {name} = req.body
    if (!name) {
        return res.status(400).json({message : "Name is required"})
    }
    if (typeof name !== 'string') {
        return res.status(400).json({message : "Name must be string"})
    }
    const firstLetter = name.charAt(0)
    if (firstLetter !== firstLetter.toUpperCase()) {
        return res.status(400).json({message : "Name's first letter must be uppercase"})
    }
    next()
}
module.exports = validateName