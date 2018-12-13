const { createError } = require('apollo-errors')

exports.ServerError = createError('Server Error', {
  message: 'A server error has occured. Please try again',
})

exports.UserExistsError = createError('User Exists Error', {
  message: 'A user with this email address already exists',
})
