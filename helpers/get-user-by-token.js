const jwt = require('jsonwebtoken')
const User = require('../models/Users')

const getUserByToken = async (token) => {
    if(!token){
        return res.status(401).json({message: 'Acesso negado'})
    }
    const decoded = jwt.verify(token, 'nossosecrete')
    const userId = decoded.id
    const user = await User.findOne({_id: userId }).select("-password")
    return user
}

module.exports = getUserByToken