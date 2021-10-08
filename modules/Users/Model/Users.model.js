const mongoose = require('mongoose')
const userScheme = require('../Scheme/User.scheme')

const User = mongoose.model('user', userScheme)

module.exports = User
