const jwt = require('jwt-simple')
const moment = require('moment')
const secret = 'cristianrojas'

exports.createToken = (user) => {
    let payload = {
        sub: user._id,
        names: user.names,
        lastnames: user.lastnames,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(7, "days").unix()
    }

    return jwt.encode(payload, secret)
}