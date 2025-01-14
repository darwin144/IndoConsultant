var jwt = require("jsonwebtoken")
const SECRET_KEY = "zyzz"


const signToken = (data) => {
    console.log(data, SECRET_KEY);
    return jwt.sign(data, SECRET_KEY)
}

const verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY)
}

module.exports = {
    signToken,
    verifyToken
}