const bcrypt = require('bcryptjs');

const hashPassword = (input) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(input, salt);
    return hash
}

const checkPassword = (input, hash) => {
    console.log(input,hash);
    return bcrypt.compareSync(input, hash)
}


module.exports = {hashPassword,checkPassword}