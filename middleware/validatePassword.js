function validatePassword(req,res,next) {
    const {password} = req.body
    if (!password) {
        return res.status(400).json({message : "Password is required"})
    }
    if (typeof password !== 'string') {
        return res.status(400).json({message : "Something went wrong"})
    }
    if (password.length < 5) {
        return res.status(400).json({message : "Password must be minimum lenght of 5"})
    }
    let hasUpperCase = false;
    let hasSymbol = false;
    const symbols = `!@#%^&*()_+[]{};':",.<>?/\\|`
    for(let char of password){
        if (char >= 'A' && char <= 'Z') {
            hasUpperCase = true
        }
        if (symbols.includes(char)) {
            hasSymbol = true
        }
    }
    if (!hasUpperCase) {
        return res.status(400).json({message : "Password must have uppercase"})
    }
    if (!hasSymbol) {
        return res.status(400).json({message : "Password must have symbol"})
    }
    next()
}
module.exports = validatePassword