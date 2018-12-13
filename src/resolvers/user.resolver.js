const { hashPassword } = require('../config/utils')
const { UserExistsError, ServerError } = require('../config/errors')

// TODO: add login mutation

module.exports = {
  Mutation: {
    signup: async (_, args, ctx) => {
      let userCount = await ctx
        .db('users')
        .where({ email: args.email })
        .count('id as count')
      if (userCount[0].count > 0) {
        throw new UserExistsError()
      }
      let hashedPassword = await hashPassword(args.password)
      try {
        await ctx.db('users').insert({
          ...args,
          password: hashedPassword,
        })
      } catch (e) {
        throw new ServerError()
      }
      return true
    },
  },
}
