const bcrypt = require('bcrypt')

const saltRounds = process.env.SALT_ROUNDS

exports.prettyPrint = object => {
  console.log(JSON.stringify(object, null, 2))
}

exports.hashPassword = async password => {
  let salt = await bcrypt.genSalt(saltRounds)
  let hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}
