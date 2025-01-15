const { Log } = require('../models')

const authorizationPremium = async (req, res, next) => {
    const id = +req.params.id
    try {
        const log = await Log.findByPk(id)
        if (!log) {
            throw { name: "NotFound", id }
        }
        if (req.user.isPremium === true) {
            console.log(req.user);
            next();
        }
        else {
            throw { name: "Forbidden", product }
        }
    } catch (err) {
        next(err)
    }

}

const authorizationEditDelete = async (req, res, next) => {
    const id = +req.params.id
    try {
        const log = await Log.findByPk(id)
        if (!log) {
            throw { name: "NotFound", id }
        }
        if (log.UserId === req.user.id) {
            next();
        }
        else {
            throw { name: "Forbidden", product }
        }
    } catch (err) {
        next(err)
    }
}
module.exports = { authorizationPremium, authorizationEditDelete }