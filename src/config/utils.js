const bcrypt = require('bcrypt')
const { ServerError } = require('./errors')

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10)

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
