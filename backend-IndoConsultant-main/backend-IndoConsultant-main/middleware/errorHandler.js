

const errorHandler = (err, req, res, next) => {
    console.log(err, '>>>');
    if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError" ) {
        res.status(400).json({ msg: err.errors[0].message })
    } //harus handle unique
    else if (err.name === "wrong data" ) {
        res.status(401).json({ msg: "email or password is wrong" })
    }
    else if (err.name === "JsonWebTokenError" || err.name === "InvalidToken") {
        res.status(401).json({ msg: "Invalid Token" })
    }
    else if (err.name === "NotFound") {
        res.status(404).json({ msg: `Not found` })
    }
    else if (err.name === "Forbidden") {
        res.status(403).json({ msg: `cant access` })
    }
    else if (err.name === "already_subscribed") {
        res.status(400).json({ msg: `Already Premium` })
    }
    else {
        res.status(500).json({msg:"Internal Server Error"})
    }
}


module.exports = {errorHandler}