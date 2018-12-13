const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ServerError, AuthenticationError } = require('./errors')

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10)
const jwtSecret = process.env.JWT_SECRET

exports.prettyPrint = object => {
  console.log(JSON.stringify(object, null, 2))
}

exports.hashPassword = async password => {
  try {
    let salt = await bcrypt.genSalt(saltRounds)
    let hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  } catch (e) {
    throw new ServerError()
  }
}

exports.compareHash = async (password, hash) => {
  try {
    let isCorrect = await bcrypt.compare(password, hash)
    return isCorrect
  } catch (e) {
    return false
  }
}

exports.createJWTToken = fields => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { ...fields, time: Date.now() },
      jwtSecret,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw new ServerError()
        resolve(token)
      }
    )
  })
}

exports.verifyToken = token => {
  return new Promise((resolve, reject) => {
    if (!token) throw new AuthenticationError()
    jwt.verify(token, jwtSecret, {}, (err, decoded) => {
      if (err || !decoded) throw new AuthenticationError()
      resolve(decoded.id)
    })
  })
}
