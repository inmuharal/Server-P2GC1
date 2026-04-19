const bcrypt = require('bcryptjs')

const hashPassword = (payload) => {
    return bcrypt.hashSync(payload)
}

const comparePassword = (pass, hashedPass) => {
    return bcrypt.compareSync(pass, hashedPass);
}

// const hashPassword = (inPassword) => {
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(inPassword, salt);
//     return hash
// }

module.exports = {hashPassword , comparePassword }