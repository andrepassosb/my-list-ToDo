const jwt = require('jsonwebtoken')

const createUserToken = async(user, req, res) => {
    const token = jwt.sign({
        name: user.name,
        id: user._id,

    }, "nossosecrete")
    return token
}

module.exports = createUserToken