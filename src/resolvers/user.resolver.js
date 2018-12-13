const { hashPassword } = require('../utils')

// TODO: add login mutation

module.exports = {
  Mutation: {
    signup: async (_, { password, ...rest }, ctx) => {
      try {
        let hashedPassword = await hashPassword(password)
        await ctx.db('users').insert({
          password: hashedPassword,
          ...rest,
        })
        return true
      } catch (e) {
        return false
      }
    },
  },
}
